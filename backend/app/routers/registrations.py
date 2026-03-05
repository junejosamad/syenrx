from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from typing import List
from .. import database, models, schemas
from .events import get_current_user

router = APIRouter(
    prefix="/api/registrations",
    tags=["Registrations"]
)

@router.get("/draft/{event_id}", response_model=schemas.RegistrationResponse)
def get_registration_draft(event_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
    """Fetch an existing, incomplete registration draft for the logged in user."""
    draft = db.query(models.Registration).options(
        joinedload(models.Registration.step_responses),
        joinedload(models.Registration.team).joinedload(models.Team.members)
    ).filter(
        models.Registration.event_id == event_id,
        models.Registration.user_id == current_user.id,
        models.Registration.is_complete == False
    ).first()
    
    if not draft:
        raise HTTPException(status_code=404, detail="No draft found")
    
    return draft

@router.post("/", response_model=schemas.RegistrationResponse)
def create_or_update_registration(
    registration: schemas.RegistrationCreate, 
    current_user: models.User = Depends(get_current_user), 
    db: Session = Depends(database.get_db)
):
    # Check if event exists
    event = db.query(models.Event).filter(models.Event.id == registration.event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    try:
        registration_data = registration.dict()
        # Pop relational data out
        user_name = registration_data.pop("user_name", current_user.username)
        user_email = registration_data.pop("user_email", current_user.email)
        team_name = registration_data.pop("team_name", None)
        team_members_data = registration_data.pop("team_members", [])
        form_field_values = registration_data.pop("form_field_values", {})
        step_field_values = registration_data.pop("step_field_values", {})
        
        # Override user ID with authenticated user
        registration_data["user_id"] = current_user.id
        
        # Check if an incomplete draft already exists
        existing_registration = db.query(models.Registration).filter(
            models.Registration.event_id == registration.event_id,
            models.Registration.user_id == current_user.id,
            models.Registration.is_complete == False
        ).first()

        if existing_registration:
            # Update existing registration
            for key, value in registration_data.items():
                if value is not None:
                    setattr(existing_registration, key, value)
            db.commit()
            db.refresh(existing_registration)
            reg_id = existing_registration.id
        else:
            # Create new registration record
            new_registration = models.Registration(**registration_data)
            db.add(new_registration)
            db.commit()
            db.refresh(new_registration)
            reg_id = new_registration.id

        # Handle Team Updates
        if registration.registration_type == "team" and team_name:
            team = db.query(models.Team).filter(models.Team.registration_id == reg_id).first()
            if not team:
                team = models.Team(registration_id=reg_id, team_name=team_name)
                db.add(team)
                db.commit()
                db.refresh(team)
            elif team.team_name != team_name:
                team.team_name = team_name
                db.commit()

            # For drafts, we wipe and rewrite team members to keep it simple
            if team_members_data is not None:
                db.query(models.TeamMember).filter(models.TeamMember.team_id == team.id).delete()
                for member_data in team_members_data:
                    new_member = models.TeamMember(
                        team_id=team.id,
                        member_name=member_data.get("name"),
                        member_email=member_data.get("email")
                    )
                    db.add(new_member)
                db.commit()
        
        # Save step field responses (new) - Rewrite existing for this registration
        if step_field_values:
            # Delete old responses for this registration draft
            db.query(models.StepFieldResponse).filter(models.StepFieldResponse.registration_id == reg_id).delete()
            
            for field_id, value in step_field_values.items():
                if value:  # Only save non-empty strings/values
                    step_response = models.StepFieldResponse(
                        registration_id=reg_id,
                        field_id=int(field_id),
                        response_value=str(value)
                    )
                    db.add(step_response)
            db.commit()
            
        final_registration = db.query(models.Registration).filter(models.Registration.id == reg_id).first()
        return final_registration
        
    except Exception as e:
        print(f"Error upserting registration: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/event/{event_id}", response_model=List[schemas.RegistrationResponse])
def get_registrations_by_event(event_id: int, current_user: models.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
    """Get all registrations for a specific event - only admins of this event should really see this"""
    registrations = db.query(models.Registration).filter(
        models.Registration.event_id == event_id,
        models.Registration.is_complete == True
    ).all()
    return registrations
