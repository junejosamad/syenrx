"""
Seed script: Creates the SynerX 2026 event in the database.
Run this once before using the landing page registration.

Usage:
    python seed_synerx.py
"""

import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from datetime import datetime
from backend.app.database import SessionLocal, engine, Base
from backend.app import models

# Ensure tables exist
Base.metadata.create_all(bind=engine)

def seed_synerx():
    db = SessionLocal()
    
    try:
        # Check if SynerX event already exists
        existing = db.query(models.Event).filter(
            models.Event.title.like("%SynerX%")
        ).first()
        
        if existing:
            print(f"SynerX event already exists (ID: {existing.id}). Skipping seed.")
            return
        
        # We need an admin user. Find one or create a system admin.
        admin = db.query(models.User).filter(models.User.is_admin == True).first()
        
        if not admin:
            from backend.app.auth import get_password_hash
            admin = models.User(
                username="synerx_admin",
                email="admin@synerx.pk",
                password=get_password_hash("admin123"),
                is_admin=True
            )
            db.add(admin)
            db.commit()
            db.refresh(admin)
            print(f"Created admin user: admin@synerx.pk / admin123")
        
        # Create the SynerX 2026 event
        event = models.Event(
            title="SynerX 2026: Pakistan's Next Generation Tech Convergence",
            description="Hackathons, Competitions, Workshops, and the Startup Arena — all under one roof. Join 2000+ innovators at Pakistan's biggest tech convergence.",
            admin_id=admin.id,
            is_team_event=False,
            has_entry_fee=True,
            entry_fee=0.00,  # Free tier available
            event_date=datetime(2026, 3, 28, 9, 0, 0),
            registration_deadline=datetime(2026, 3, 25, 23, 59, 59),
            max_registrations=2000
        )
        db.add(event)
        db.commit()
        db.refresh(event)
        
        print(f"Created SynerX 2026 event (ID: {event.id})")
        
        # Add schedule items
        schedules = [
            ("Opening Ceremony & Keynote", "Main Stage", datetime(2026, 3, 28, 9, 0), datetime(2026, 3, 28, 10, 0)),
            ("Building with Generative AI", "Hall A", datetime(2026, 3, 28, 10, 30), datetime(2026, 3, 28, 12, 0)),
            ("Decentralized Infrastructure Workshop", "Hall B", datetime(2026, 3, 28, 11, 30), datetime(2026, 3, 28, 13, 0)),
            ("Design Systems at Scale", "Hall C", datetime(2026, 3, 28, 13, 0), datetime(2026, 3, 28, 14, 30)),
            ("Hackathon Kickoff", "Main Stage", datetime(2026, 3, 28, 14, 30), datetime(2026, 3, 28, 15, 0)),
            ("Speed Programming Challenge — Round 1", "Lab 1", datetime(2026, 3, 28, 16, 0), datetime(2026, 3, 28, 18, 0)),
            ("Human-Robot Collaboration Demo", "Hall A", datetime(2026, 3, 29, 9, 0), datetime(2026, 3, 29, 10, 30)),
            ("Edge Computing Revolution", "Hall B", datetime(2026, 3, 29, 10, 30), datetime(2026, 3, 29, 12, 0)),
            ("Startup Pitch Finals", "Main Stage", datetime(2026, 3, 29, 12, 0), datetime(2026, 3, 29, 14, 0)),
            ("UI/UX Design Jam Results", "Hall C", datetime(2026, 3, 29, 14, 0), datetime(2026, 3, 29, 15, 30)),
            ("Hackathon Demo Day & Judging", "Main Stage", datetime(2026, 3, 29, 15, 30), datetime(2026, 3, 29, 17, 0)),
            ("Closing Ceremony & Awards", "Main Stage", datetime(2026, 3, 29, 17, 0), datetime(2026, 3, 29, 18, 30)),
        ]
        
        for title, location, start, end in schedules:
            schedule = models.EventSchedule(
                event_id=event.id,
                activity_title=title,
                start_time=start,
                end_time=end,
                location=location
            )
            db.add(schedule)
        
        db.commit()
        print(f"Added {len(schedules)} schedule items.")
        print("Done! SynerX 2026 event is ready.")
        
    except Exception as e:
        db.rollback()
        print(f"Error: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_synerx()
