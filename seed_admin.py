import sys
import os

# Adjust path so we can import from backend
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.app.database import SessionLocal, engine, Base
from backend.app.models import User
from backend.app.auth import get_password_hash

def seed_admin():
    db = SessionLocal()
    
    # Check if admin already exists
    existing_admin = db.query(User).filter(User.username == "admin").first()
    if existing_admin:
        print("Admin user already exists!")
        print(f"Username: {existing_admin.username}")
        # Reset password to 'admin' just in case
        existing_admin.password = get_password_hash("admin")
        existing_admin.is_admin = True
        db.commit()
        print("Password reset to 'admin'")
        return
        
    print("Creating default admin account...")
    
    admin_user = User(
        username="admin",
        email="admin@example.com",
        password=get_password_hash("admin"),
        is_admin=True
    )
    
    db.add(admin_user)
    db.commit()
    db.refresh(admin_user)
    
    print("\nAdmin account created successfully!")
    print("-" * 30)
    print("Username: admin")
    print("Password: admin")
    print("-" * 30)
    print("You can now log in to the admin dashboard.")
    
    db.close()

if __name__ == "__main__":
    seed_admin()
