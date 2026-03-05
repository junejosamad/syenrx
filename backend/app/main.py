from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from .database import engine, Base
from .routers import auth, users, events, form_fields

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Event Management API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Uploads directory
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(events.router)
from .routers import registrations
app.include_router(registrations.router)
app.include_router(form_fields.router)

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Event Management API is running"}
