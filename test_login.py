import urllib.request
import urllib.parse
import json

def test_login():
    url = "http://localhost:8000/token"
    data = urllib.parse.urlencode({
        "username": "admin@example.com",
        "password": "adminpassword"
    }).encode()
    
    req = urllib.request.Request(url, data=data, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    
    try:
        with urllib.request.urlopen(req) as response:
            print(f"Status Code: {response.status}")
            response_body = response.read().decode()
            print(f"Response: {response_body}")
            print("Login Successful!")
            
    except urllib.error.HTTPError as e:
        print(f"Status Code: {e.code}")
        print(f"Response: {e.read().decode()}")
        print("Login Failed!")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_login()
