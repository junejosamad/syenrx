from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import database, models, schemas

router = APIRouter(
    prefix="/api/form-fields",
    tags=["Form Fields"]
)

@router.get("/event/{event_id}", response_model=List[schemas.FormFieldResponse])
def get_form_fields_by_event(event_id: int, db: Session = Depends(database.get_db)):
    """Get all form fields for a specific event"""
    form_fields = db.query(models.FormField).filter(
        models.FormField.event_id == event_id
    ).order_by(models.FormField.field_order).all()
    return form_fields
