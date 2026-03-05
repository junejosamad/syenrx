from backend.app.database import SessionLocal
from backend.app.models import User
from backend.app.auth import get_password_hash

def create_admin():
    db = SessionLocal()
    try:
        # Check if admin exists
        admin = db.query(User).filter(User.email == "admin@example.com").first()
        if admin:
            print("Admin account already exists.")
            print("Email: admin@example.com")
            print("Password: adminpassword (if not changed)")
            return

        # Create new admin
        hashed_password = get_password_hash("adminpassword")
        new_admin = User(
            username="admin",
            email="admin@example.com",
            password=hashed_password,
            is_admin=True
        )
        db.add(new_admin)
        db.commit()
        print("Admin account created successfully!")
        print("Username: admin")
        print("Email: admin@example.com")
        print("Password: adminpassword")
        
    except Exception as e:
        print(f"Error creating admin: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()
