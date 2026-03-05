from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True, index=True)
    email = Column(String(255), unique=True, index=True)
    password = Column(String(255))
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    events = relationship("Event", back_populates="admin")
    registrations = relationship("Registration", back_populates="user")
    team_members = relationship("TeamMember", back_populates="user")

class Event(Base):
    __tablename__ = "events"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    description = Column(Text)
    admin_id = Column(Integer, ForeignKey("users.id"))
    is_team_event = Column(Boolean, default=False)
    team_size = Column(Integer, nullable=True)
    has_entry_fee = Column(Boolean, default=False)
    entry_fee = Column(Float, nullable=True)
    payment_details = Column(Text)
    event_date = Column(DateTime)
    registration_deadline = Column(DateTime)
    max_registrations = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    admin = relationship("User", back_populates="events")
    registrations = relationship("Registration", back_populates="event")
    form_fields = relationship("FormField", back_populates="event")
    modules = relationship("EventModule", back_populates="event", order_by="EventModule.module_order")
    schedules = relationship("EventSchedule", back_populates="event", order_by="EventSchedule.start_time")

class EventModule(Base):
    __tablename__ = "event_modules"
    
    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id", ondelete="CASCADE"))
    title = Column(String(255))
    description = Column(Text, nullable=True)
    module_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    event = relationship("Event", back_populates="modules")
    steps = relationship("ModuleStep", back_populates="module", order_by="ModuleStep.step_order")

class ModuleStep(Base):
    __tablename__ = "module_steps"
    
    id = Column(Integer, primary_key=True, index=True)
    module_id = Column(Integer, ForeignKey("event_modules.id", ondelete="CASCADE"))
    title = Column(String(255))
    description = Column(Text, nullable=True)
    step_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    module = relationship("EventModule", back_populates="steps")
    fields = relationship("StepField", back_populates="step", order_by="StepField.field_order")

class StepField(Base):
    __tablename__ = "step_fields"
    
    id = Column(Integer, primary_key=True, index=True)
    step_id = Column(Integer, ForeignKey("module_steps.id", ondelete="CASCADE"))
    field_name = Column(String(255))
    field_type = Column(String(50))  # text, email, number, select, textarea, date, file, phone, checkbox
    is_required = Column(Boolean, default=True)
    field_order = Column(Integer, default=0)
    options = Column(Text, nullable=True)  # JSON string for select options
    placeholder = Column(String(255), nullable=True)
    
    step = relationship("ModuleStep", back_populates="fields")
    responses = relationship("StepFieldResponse", back_populates="field")

class EventSchedule(Base):
    __tablename__ = "event_schedules"
    
    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id", ondelete="CASCADE"))
    activity_title = Column(String(255))
    activity_description = Column(Text, nullable=True)
    start_time = Column(DateTime)
    end_time = Column(DateTime, nullable=True)
    location = Column(String(255), nullable=True)
    
    event = relationship("Event", back_populates="schedules")

class Registration(Base):
    __tablename__ = "registrations"
    
    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    registration_type = Column(String(50), nullable=True)  # "individual" or "team", allowed to be null initially for drafts
    payment_proof_path = Column(String(255), nullable=True)
    is_payment_verified = Column(Boolean, default=False)
    registration_date = Column(DateTime, default=datetime.utcnow)
    status = Column(String(50), default="pending")  # pending, confirmed, rejected
    current_step_index = Column(Integer, default=0)  # tracks progress in wizard
    is_complete = Column(Boolean, default=False)
    
    event = relationship("Event", back_populates="registrations")
    user = relationship("User", back_populates="registrations")
    form_responses = relationship("FormResponse", back_populates="registration")
    step_responses = relationship("StepFieldResponse", back_populates="registration")
    team = relationship("Team", back_populates="registration", uselist=False)

class Team(Base):
    __tablename__ = "teams"
    
    id = Column(Integer, primary_key=True, index=True)
    registration_id = Column(Integer, ForeignKey("registrations.id"), unique=True)
    team_name = Column(String(255))
    
    registration = relationship("Registration", back_populates="team")
    members = relationship("TeamMember", back_populates="team")

class TeamMember(Base):
    __tablename__ = "team_members"
    
    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey("teams.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    member_name = Column(String(255))
    member_email = Column(String(255))
    
    team = relationship("Team", back_populates="members")
    user = relationship("User", back_populates="team_members")

# Legacy FormField - kept for backward compatibility
class FormField(Base):
    __tablename__ = "form_fields"
    
    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"))
    field_name = Column(String(255))
    field_type = Column(String(50))
    is_required = Column(Boolean, default=True)
    field_order = Column(Integer)
    options = Column(Text, nullable=True)
    
    event = relationship("Event", back_populates="form_fields")
    responses = relationship("FormResponse", back_populates="field")

class FormResponse(Base):
    __tablename__ = "form_responses"
    
    id = Column(Integer, primary_key=True, index=True)
    registration_id = Column(Integer, ForeignKey("registrations.id"))
    field_id = Column(Integer, ForeignKey("form_fields.id"))
    response_value = Column(Text)
    
    registration = relationship("Registration", back_populates="form_responses")
    field = relationship("FormField", back_populates="responses")

class StepFieldResponse(Base):
    __tablename__ = "step_field_responses"
    
    id = Column(Integer, primary_key=True, index=True)
    registration_id = Column(Integer, ForeignKey("registrations.id", ondelete="CASCADE"))
    field_id = Column(Integer, ForeignKey("step_fields.id", ondelete="CASCADE"))
    response_value = Column(Text)
    
    registration = relationship("Registration", back_populates="step_responses")
    field = relationship("StepField", back_populates="responses")
