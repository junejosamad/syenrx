import requests
import json

BASE_URL = "http://localhost:8000"

def test_api():
    print("--- Starting API Verification ---")
    
    # 1. Login
    print("\n1. Testing Login...")
    login_data = {"username": "admin@example.com", "password": "adminpassword"}
    try:
        response = requests.post(f"{BASE_URL}/token", data=login_data)
        if response.status_code == 200:
            token = response.json()["access_token"]
            print("✅ Login Successful")
        else:
            print(f"❌ Login Failed: {response.status_code} - {response.text}")
            return
    except Exception as e:
        print(f"❌ Login Error: {e}")
        return

    headers = {"Authorization": f"Bearer {token}"}

    # 2. Create Event
    print("\n2. Testing Create Event...")
    event_data = {
        "title": "Test Event",
        "description": "This is a test event",
        "is_team_event": False,
        "has_entry_fee": False,
        "event_date": "2025-12-25T10:00:00",
        "registration_deadline": "2025-12-24T10:00:00",
        "max_registrations": 100
    }
    try:
        response = requests.post(f"{BASE_URL}/api/events/", json=event_data, headers=headers)
        if response.status_code == 200:
            event_id = response.json()["id"]
            print(f"✅ Create Event Successful (ID: {event_id})")
        else:
            print(f"❌ Create Event Failed: {response.status_code} - {response.text}")
            return
    except Exception as e:
        print(f"❌ Create Event Error: {e}")
        return

    # 3. Get Events
    print("\n3. Testing Get Events...")
    try:
        response = requests.get(f"{BASE_URL}/api/events/")
        if response.status_code == 200:
            events = response.json()
            print(f"✅ Get Events Successful (Count: {len(events)})")
        else:
            print(f"❌ Get Events Failed: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❌ Get Events Error: {e}")

    # 4. Register for Event
    print("\n4. Testing Registration...")
    registration_data = {
        "event_id": event_id,
        "user_id": 1, # Assuming admin user exists with ID 1
        "registration_type": "individual"
    }
    try:
        response = requests.post(f"{BASE_URL}/api/registrations/", json=registration_data)
        if response.status_code == 200:
            print("✅ Registration Successful")
        else:
            print(f"❌ Registration Failed: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❌ Registration Error: {e}")

    # 5. Delete Event
    print("\n5. Testing Delete Event...")
    try:
        response = requests.delete(f"{BASE_URL}/api/events/{event_id}", headers=headers)
        if response.status_code == 200:
            print("✅ Delete Event Successful")
        else:
            print(f"❌ Delete Event Failed: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❌ Delete Event Error: {e}")

    print("\n--- Verification Complete ---")

if __name__ == "__main__":
    test_api()
