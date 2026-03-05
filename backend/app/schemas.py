from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# ─── Auth ───────────────────────────────────────────────

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    is_admin: bool
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class UserBasicInfo(BaseModel):
    id: int
    username: str
    email: str
    
    class Config:
        from_attributes = True

# ─── Step Fields ────────────────────────────────────────

class StepFieldCreate(BaseModel):
    field_name: str
    field_type: str  # text, email, phone, number, textarea, select, checkbox, date, file
    is_required: bool = True
    field_order: int = 0
    options: Optional[str] = None  # JSON string for select options
    placeholder: Optional[str] = None

class StepFieldResponse(BaseModel):
    id: int
    step_id: int
    field_name: str
    field_type: str
    is_required: bool
    field_order: int
    options: Optional[str] = None
    placeholder: Optional[str] = None
    
    class Config:
        from_attributes = True

# ─── Module Steps ───────────────────────────────────────

class ModuleStepCreate(BaseModel):
    title: str
    description: Optional[str] = None
    step_order: int = 0
    fields: Optional[List[StepFieldCreate]] = []

class ModuleStepResponse(BaseModel):
    id: int
    module_id: int
    title: str
    description: Optional[str] = None
    step_order: int
    fields: List[StepFieldResponse] = []
    
    class Config:
        from_attributes = True

# ─── Event Modules ──────────────────────────────────────

class EventModuleCreate(BaseModel):
    title: str
    description: Optional[str] = None
    module_order: int = 0
    steps: Optional[List[ModuleStepCreate]] = []

class EventModuleResponse(BaseModel):
    id: int
    event_id: int
    title: str
    description: Optional[str] = None
    module_order: int
    steps: List[ModuleStepResponse] = []
    
    class Config:
        from_attributes = True

# ─── Event Schedules ───────────────────────────────────

class EventScheduleCreate(BaseModel):
    activity_title: str
    activity_description: Optional[str] = None
    start_time: datetime
    end_time: Optional[datetime] = None
    location: Optional[str] = None

class EventScheduleResponse(BaseModel):
    id: int
    event_id: int
    activity_title: str
    activity_description: Optional[str] = None
    start_time: datetime
    end_time: Optional[datetime] = None
    location: Optional[str] = None
    
    class Config:
        from_attributes = True

# ─── Events ────────────────────────────────────────────

class EventCreate(BaseModel):
    title: str
    description: str
    is_team_event: bool
    team_size: Optional[int] = None
    has_entry_fee: bool
    entry_fee: Optional[float] = None
    payment_details: Optional[str] = None
    event_date: datetime
    registration_deadline: datetime
    max_registrations: Optional[int] = None
    form_fields: Optional[List[dict]] = None  # Legacy flat fields
    modules: Optional[List[EventModuleCreate]] = None
    schedules: Optional[List[EventScheduleCreate]] = None

class EventResponse(BaseModel):
    id: int
    title: str
    description: str
    is_team_event: bool
    team_size: Optional[int]
    has_entry_fee: bool
    entry_fee: Optional[float]
    payment_details: Optional[str]
    event_date: datetime
    registration_deadline: datetime
    max_registrations: Optional[int] = None
    created_at: datetime
    modules: List[EventModuleResponse] = []
    schedules: List[EventScheduleResponse] = []

    class Config:
        from_attributes = True

class EventDetailResponse(BaseModel):
    id: int
    title: str
    description: str
    is_team_event: bool
    team_size: Optional[int]
    has_entry_fee: bool
    entry_fee: Optional[float]
    payment_details: Optional[str]
    event_date: datetime
    registration_deadline: datetime
    max_registrations: Optional[int] = None
    created_at: datetime
    modules: List[EventModuleResponse] = []
    schedules: List[EventScheduleResponse] = []
    
    class Config:
        from_attributes = True

# ─── Legacy Form Fields (backward compat) ──────────────

class FormFieldCreate(BaseModel):
    field_name: str
    field_type: str
    is_required: bool
    field_order: int
    options: Optional[str] = None

class FormFieldResponse(BaseModel):
    id: int
    event_id: int
    field_name: str
    field_type: str
    is_required: bool
    field_order: int
    options: Optional[str] = None
    
    class Config:
        from_attributes = True

# ─── Registrations ─────────────────────────────────────

class RegistrationCreate(BaseModel):
    event_id: int
    user_id: Optional[int] = None
    user_name: Optional[str] = None
    user_email: Optional[str] = None
    registration_type: Optional[str] = None  # "individual" or "team", optional for early drafts
    team_name: Optional[str] = None
    team_members: Optional[List[dict]] = None
    form_field_values: Optional[dict] = None  # Legacy
    step_field_values: Optional[dict] = None  # New: { field_id: value }
    is_complete: Optional[bool] = False       # Tracking draft progress
    current_step_index: Optional[int] = 0     # Tracking wizard position

class TeamResponse(BaseModel):
    team_name: str
    class Config:
        from_attributes = True

class FormResponseSchema(BaseModel):
    field_id: int
    response_value: str
    
    class Config:
        from_attributes = True

class StepFieldResponseSchema(BaseModel):
    field_id: int
    response_value: str
    
    class Config:
        from_attributes = True

class RegistrationResponse(BaseModel):
    id: int
    event_id: int
    user_id: Optional[int]
    user: Optional[UserBasicInfo] = None
    registration_type: Optional[str] = None
    team: Optional[TeamResponse] = None
    registration_date: datetime
    status: str
    is_payment_verified: bool
    is_complete: Optional[bool] = False
    current_step_index: Optional[int] = 0
    form_responses: Optional[List[FormResponseSchema]] = []
    step_responses: Optional[List[StepFieldResponseSchema]] = []

    class Config:
        from_attributes = True
