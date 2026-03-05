from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from typing import List
from .. import database, models, schemas, auth
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

router = APIRouter(
    prefix="/api/events",
    tags=["Events"]
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.username == token_data.username).first()
    if user is None:
        raise credentials_exception
    return user

def require_admin(current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Only admins can perform this action")
    return current_user

@router.post("/", response_model=schemas.EventResponse)
def create_event(event: schemas.EventCreate, current_user: models.User = Depends(require_admin), db: Session = Depends(database.get_db)):
    # Extract nested data before creating event
    event_data = event.dict()
    form_fields_data = event_data.pop("form_fields", []) or []
    modules_data = event_data.pop("modules", []) or []
    schedules_data = event_data.pop("schedules", []) or []
    
    new_event = models.Event(**event_data, admin_id=current_user.id)
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    
    # Save legacy form fields if provided
    if form_fields_data:
        for idx, field in enumerate(form_fields_data):
            form_field = models.FormField(
                event_id=new_event.id,
                field_name=field.get("label", field.get("name", "")),
                field_type=field.get("type", "text"),
                is_required=field.get("required", False),
                field_order=idx,
                options=str(field.get("options", [])) if field.get("options") else None
            )
            db.add(form_field)
        db.commit()
    
    # Save modules -> steps -> fields
    if modules_data:
        for m_idx, mod_data in enumerate(modules_data):
            new_module = models.EventModule(
                event_id=new_event.id,
                title=mod_data.get("title", f"Module {m_idx+1}"),
                description=mod_data.get("description"),
                module_order=mod_data.get("module_order", m_idx)
            )
            db.add(new_module)
            db.commit()
            db.refresh(new_module)
            
            steps_data = mod_data.get("steps", []) or []
            for s_idx, step_data in enumerate(steps_data):
                new_step = models.ModuleStep(
                    module_id=new_module.id,
                    title=step_data.get("title", f"Step {s_idx+1}"),
                    description=step_data.get("description"),
                    step_order=step_data.get("step_order", s_idx)
                )
                db.add(new_step)
                db.commit()
                db.refresh(new_step)
                
                fields_data = step_data.get("fields", []) or []
                for f_idx, field_data in enumerate(fields_data):
                    new_field = models.StepField(
                        step_id=new_step.id,
                        field_name=field_data.get("field_name", ""),
                        field_type=field_data.get("field_type", "text"),
                        is_required=field_data.get("is_required", True),
                        field_order=field_data.get("field_order", f_idx),
                        options=field_data.get("options"),
                        placeholder=field_data.get("placeholder")
                    )
                    db.add(new_field)
                db.commit()
    
    # Save schedules
    if schedules_data:
        for sched_data in schedules_data:
            new_schedule = models.EventSchedule(
                event_id=new_event.id,
                activity_title=sched_data.get("activity_title", ""),
                activity_description=sched_data.get("activity_description"),
                start_time=sched_data.get("start_time"),
                end_time=sched_data.get("end_time"),
                location=sched_data.get("location")
            )
            db.add(new_schedule)
        db.commit()
    
    return new_event

@router.get("/", response_model=List[schemas.EventResponse])
def get_all_events(db: Session = Depends(database.get_db)):
    events = db.query(models.Event).all()
    return events

@router.get("/{event_id}", response_model=schemas.EventDetailResponse)
def get_event(event_id: int, db: Session = Depends(database.get_db)):
    event = db.query(models.Event).options(
        joinedload(models.Event.modules).joinedload(models.EventModule.steps).joinedload(models.ModuleStep.fields),
        joinedload(models.Event.schedules)
    ).filter(models.Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.delete("/{event_id}")
def delete_event(event_id: int, current_user: models.User = Depends(require_admin), db: Session = Depends(database.get_db)):
    event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    if event.admin_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this event")
    
    db.delete(event)
    db.commit()
    return {"message": "Event deleted successfully"}
