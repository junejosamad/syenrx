from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
import secrets
from .. import database, models, schemas, auth

router = APIRouter(
    prefix="/api/landing",
    tags=["Landing Page"]
)


@router.post("/register", response_model=schemas.LandingRegistrationResponse)
def landing_register(
    data: schemas.LandingRegistrationCreate,
    db: Session = Depends(database.get_db)
):
    """
    Public registration endpoint for the SynerX landing page.
    Creates a user account (if not existing) and registers for the SynerX event.
    No authentication required.
    """
    # Find the SynerX event (the first event with "SynerX" in the title)
    synerx_event = db.query(models.Event).filter(
        models.Event.title.like("%SynerX%")
    ).first()
    
    if not synerx_event:
        raise HTTPException(
            status_code=500,
            detail="SynerX event not found. Please run the seed script first."
        )
    
    # Check if user already exists by email
    existing_user = db.query(models.User).filter(
        models.User.email == data.email
    ).first()
    
    if existing_user:
        # Check if already registered for this event
        existing_reg = db.query(models.Registration).filter(
            models.Registration.event_id == synerx_event.id,
            models.Registration.user_id == existing_user.id,
            models.Registration.is_complete == True
        ).first()
        
        if existing_reg:
            raise HTTPException(
                status_code=400,
                detail="This email is already registered for SynerX 2026."
            )
        
        user = existing_user
    else:
        # Create a new user account
        # Username = email prefix + random suffix for uniqueness
        email_prefix = data.email.split("@")[0]
        random_suffix = secrets.token_hex(3)
        username = f"{email_prefix}_{random_suffix}"
        
        # Generate a random password (user can reset later)
        random_password = secrets.token_urlsafe(12)
        hashed_password = auth.get_password_hash(random_password)
        
        user = models.User(
            username=username,
            email=data.email,
            password=hashed_password,
            is_admin=False
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    # Create registration
    try:
        registration = models.Registration(
            event_id=synerx_event.id,
            user_id=user.id,
            registration_type=data.ticket_type,  # "hacker" or "vip"
            status="confirmed",
            is_complete=True,
            current_step_index=0
        )
        db.add(registration)
        db.commit()
        db.refresh(registration)
        
        return schemas.LandingRegistrationResponse(
            id=registration.id,
            email=data.email,
            ticket_type=data.ticket_type,
            message=f"Successfully registered for SynerX 2026 with {data.ticket_type.replace('hacker', 'Hacker Pass').replace('vip', 'VIP Access')}!"
        )
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")


@router.get("/stats", response_model=schemas.LandingStatsResponse)
def landing_stats(db: Session = Depends(database.get_db)):
    """
    Public stats endpoint for the SynerX landing page.
    Returns live registration count and event stats.
    """
    # Count total registrations for SynerX event
    synerx_event = db.query(models.Event).filter(
        models.Event.title.like("%SynerX%")
    ).first()
    
    total_registrations = 0
    if synerx_event:
        total_registrations = db.query(func.count(models.Registration.id)).filter(
            models.Registration.event_id == synerx_event.id,
            models.Registration.is_complete == True
        ).scalar() or 0
    
    # Count total events in system
    total_events = db.query(func.count(models.Event.id)).scalar() or 0
    
    return schemas.LandingStatsResponse(
        total_registrations=total_registrations,
        total_events=max(total_events, 40),  # Minimum display value
        total_prize_pool="$50k"
    )
