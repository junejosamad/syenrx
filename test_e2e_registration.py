import requests
import time
import uuid

BASE_URL = "http://localhost:8000"

def run_tests():
    print("Starting e2e automated tests...")
    
    # Generate unique test user
    rand_id = str(uuid.uuid4())[:8]
    test_username = f"testuser_{rand_id}"
    test_email = f"test_{rand_id}@example.com"
    test_password = "password123"

    with requests.Session() as s:
        # --- 1. Test Admin Login ---
        print("\n--- Test 1: Admin Login ---")
        login_data = {
            "username": "admin",
            "password": "admin"
        }
        res = s.post(f"{BASE_URL}/token", data=login_data)
        if res.status_code != 200:
            print(f"❌ Failed to login as admin: {res.text}")
            return
        admin_token = res.json()["access_token"]
        print("✅ Admin login successful")

        # --- 2. Test Event Creation (Admin Only) ---
        print("\n--- Test 2: Admin Event Creation (with modules/steps) ---")
        headers_admin = {"Authorization": f"Bearer {admin_token}"}
        
        event_payload = {
            "title": f"Test E2E Event {rand_id}",
            "description": "An automated test event",
            "is_team_event": False,
            "has_entry_fee": False,
            "event_date": "2026-12-31T10:00:00Z",
            "registration_deadline": "2026-12-30T10:00:00Z",
            "modules": [
                {
                    "title": "Module 1: Survey",
                    "module_order": 0,
                    "steps": [
                        {
                            "title": "Step 1: Questions",
                            "step_order": 0,
                            "fields": [
                                {
                                    "field_name": "How did you hear about us?",
                                    "field_type": "text",
                                    "is_required": True,
                                    "field_order": 0
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        
        res = s.post(f"{BASE_URL}/api/events/", json=event_payload, headers=headers_admin)
        if res.status_code != 200:
            print(f"❌ Failed to create event: {res.text}")
            return
        event_data = res.json()
        event_id = event_data["id"]
        # Extract the dynamic field ID we just created
        dynamic_field_id = event_data["modules"][0]["steps"][0]["fields"][0]["id"]
        print(f"✅ Event created successfully with ID: {event_id}. Extracted dynamic field ID: {dynamic_field_id}")

        # --- 3. Test Unauthenticated Registration (Should Fail) ---
        print("\n--- Test 3: Unauthenticated Registration Attempt ---")
        res = s.post(f"{BASE_URL}/api/registrations/", json={
            "event_id": event_id,
            "registration_type": "individual",
            "is_complete": False
        })
        if res.status_code == 401:
            print("✅ Unauthenticated registration correctly rejected (401)")
        else:
            print(f"❌ Expected 401, got {res.status_code}: {res.text}")

        # --- 4. Test User Registration (Auth Flow) ---
        print("\n--- Test 4: New User Registration & Login ---")
        res = s.post(f"{BASE_URL}/api/users/register", json={
            "username": test_username,
            "email": test_email,
            "password": test_password
        })
        if res.status_code != 200:
            print(f"❌ Failed to register user: {res.text}")
            return
            
        # Login as new user
        res = s.post(f"{BASE_URL}/token", data={"username": test_email, "password": test_password})
        if res.status_code != 200:
            print(f"❌ Failed to login new user: {res.text}")
            return
        user_token = res.json()["access_token"]
        headers_user = {"Authorization": f"Bearer {user_token}"}
        print("✅ New user registered and logged in successfully")

        # --- 5. Test Saving a Draft (Step 1) ---
        print("\n--- Test 5: Saving a Partial Draft ---")
        draft_payload = {
            "event_id": event_id,
            "registration_type": "individual",
            "is_complete": False,
            "current_step_index": 1
        }
        res = s.post(f"{BASE_URL}/api/registrations/", json=draft_payload, headers=headers_user)
        if res.status_code != 200:
            print(f"❌ Failed to save draft: {res.text}")
            return
        draft_data = res.json()
        draft_id = draft_data["id"]
        print(f"✅ Draft saved successfully with ID: {draft_id} (index=1, complete=False)")

        # --- 6. Test Fetching the Draft ---
        print("\n--- Test 6: Fetching the Saved Draft ---")
        res = s.get(f"{BASE_URL}/api/registrations/draft/{event_id}", headers=headers_user)
        if res.status_code != 200:
            print(f"❌ Failed to fetch draft: {res.text}")
            return
        fetched_draft = res.json()
        if fetched_draft["id"] == draft_id and fetched_draft["current_step_index"] == 1:
            print("✅ Draft fetched successfully and matches saved state")
        else:
            print(f"❌ Draft state mismatch: expected index 1, got {fetched_draft['current_step_index']}")

        # --- 7. Test Updating Draft (Step 2 - Adding Field Responses) ---
        print("\n--- Test 7: Updating Draft with Step Responses ---")
        update_payload = {
            "event_id": event_id,
            "registration_type": "individual",
            "is_complete": False,
            "current_step_index": 2,
            "step_field_values": {
                str(dynamic_field_id): "I heard about it from a friend!"
            }
        }
        res = s.post(f"{BASE_URL}/api/registrations/", json=update_payload, headers=headers_user)
        if res.status_code != 200:
            print(f"❌ Failed to update draft: {res.text}")
            return
            
        # Verify the update by fetching it again
        res = s.get(f"{BASE_URL}/api/registrations/draft/{event_id}", headers=headers_user)
        verified_draft = res.json()
        step_responses = verified_draft.get("step_responses", [])
        
        if len(step_responses) > 0 and step_responses[0]["response_value"] == "I heard about it from a friend!":
            print("✅ Draft updated successfully with step field responses")
        else:
            print(f"❌ Step responses not saved correctly: {step_responses}")

        # --- 8. Test Final Form Submission ---
        print("\n--- Test 8: Final Form Submission ---")
        final_payload = {
            "event_id": event_id,
            "registration_type": "individual",
            "is_complete": True,
            "current_step_index": 2,
            "step_field_values": {
                str(dynamic_field_id): "I heard about it from a friend!"
            }
        }
        res = s.post(f"{BASE_URL}/api/registrations/", json=final_payload, headers=headers_user)
        if res.status_code != 200:
            print(f"❌ Failed to submit final registration: {res.text}")
            return
            
        final_data = res.json()
        if final_data["is_complete"] == True:
            print("✅ Registration marked as complete successfully")
        else:
            print("❌ Registration is still marked as incomplete!")
            
        # Verify that querying the draft endpoint now returns 404 (because there is no incomplete draft)
        res = s.get(f"{BASE_URL}/api/registrations/draft/{event_id}", headers=headers_user)
        if res.status_code == 404:
            print("✅ Verified that completed draft is no longer returned by draft endpoint")
        else:
            print(f"❌ Expected 404 for draft endpoint after completion, got {res.status_code}")

    print("\n🎉 All automated tests completed successfully!")

if __name__ == "__main__":
    run_tests()
