# Event Management Web Application - Setup Guide

## Overview

This is a comprehensive event management system with:
- **Frontend**: Next.js/React with Paperfolio design aesthetic
- **Backend**: FastAPI (Python)
- **Database**: SQL (PostgreSQL recommended for production)
- **File Storage**: cPanel/FTP for payment proofs

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── auth/              # Authentication pages
│   ├── events/            # Public event pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── admin/             # Admin components
│   └── ui/                # UI components
├── main.py               # FastAPI backend
├── requirements.txt      # Python dependencies
├── database_schema.sql   # Database schema
└── public/               # Static files
\`\`\`

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- PostgreSQL or MySQL database
- cPanel hosting account

### 1. Frontend Setup (Next.js)

\`\`\`bash
# Install dependencies
npm install

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF

# Run development server
npm run dev
\`\`\`

Visit `http://localhost:3000`

### 2. Backend Setup (FastAPI)

#### Local Development

\`\`\`bash
# Install Python dependencies
pip install -r requirements.txt

# Create uploads directory
mkdir uploads

# Update database connection in main.py (line ~30)
# DATABASE_URL = "sqlite:///./events.db"  # For SQLite (dev)
# or
# DATABASE_URL = "postgresql://user:password@localhost/events"  # For PostgreSQL

# Run backend
python main.py
\`\`\`

Backend runs on `http://localhost:8000`

#### Production Setup (cPanel with Phusion Passenger)

1. **Upload to cPanel**
   - Connect via FTP
   - Upload all Python files to `public_html/`

2. **Create Passenger App Configuration**
   \`\`\`
   Create a file: public_html/passenger_wsgi.py
   
   import sys
   import os
   sys.path.insert(0, os.path.dirname(__file__))
   
   from main import app as application
   \`\`\`

3. **Set up Database**
   - Create PostgreSQL/MySQL database via cPanel
   - Run the SQL schema from `database_schema.sql`
   - Update DATABASE_URL in main.py with your credentials

4. **Configure Environment Variables**
   - In cPanel, set environment variables in your Passenger app configuration

5. **File Upload Directory**
   - Create `/public_html/uploads` directory with proper permissions
   - Make it writable by the Passenger app

### 3. Database Setup

#### Option A: PostgreSQL (Recommended)

\`\`\`bash
# Create database
createdb events_db

# Run schema
psql events_db < database_schema.sql

# Update main.py with connection string
DATABASE_URL = "postgresql://username:password@localhost/events_db"
\`\`\`

#### Option B: SQLite (Development)

\`\`\`bash
# Database will be created automatically
# main.py already configured for SQLite by default
\`\`\`

### 4. Environment Configuration

Create `.env` files:

**.env (Backend - main.py location)**
\`\`\`
DATABASE_URL=postgresql://user:password@localhost/events_db
UPLOAD_DIR=./uploads
API_HOST=0.0.0.0
API_PORT=8000
\`\`\`

**.env.local (Frontend - project root)**
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8000
# For production:
# NEXT_PUBLIC_API_URL=https://yourdomain.com/api
\`\`\`

## Key Features

### Admin Dashboard
- Create and manage events
- Configure event settings (team size, entry fees, payment details)
- View and manage registrations
- Build custom registration forms
- Verify payment proofs

### Public Portal
- Browse available events
- Filter by event type (team/individual)
- Register for events
- Upload payment proofs
- Fill custom forms

### Custom Form Builder
- Drag-and-drop interface
- Support for multiple field types:
  - Text, Email, Number
  - Date, Dropdown, File Upload
  - Long Text (Textarea)
- Set required fields
- Real-time preview

### Payment Management
- Entry fee configuration
- Admin can provide payment details (bank, UPI, etc.)
- Payment proof upload (JPG, PNG, PDF)
- Admin verification workflow

### Team Management
- Configurable team sizes
- Add multiple team members per registration
- Team member email and name collection

## API Endpoints

### Users
- `POST /api/users/register` - Create account
- `GET /api/users/{user_id}` - Get user info

### Events
- `GET /api/events` - List all events
- `GET /api/events/{event_id}` - Get event details
- `POST /api/events` - Create event (admin only)
- `PUT /api/events/{event_id}` - Update event (admin only)
- `DELETE /api/events/{event_id}` - Delete event (admin only)

### Form Fields
- `GET /api/events/{event_id}/form-fields` - Get form fields
- `POST /api/events/{event_id}/form-fields` - Add form field (admin only)
- `DELETE /api/form-fields/{field_id}` - Delete form field (admin only)

### Registrations
- `POST /api/registrations` - Create registration
- `GET /api/registrations/event/{event_id}` - List registrations (admin only)
- `PUT /api/registrations/{registration_id}/status` - Update status (admin only)
- `POST /api/registrations/{registration_id}/upload-payment-proof` - Upload payment proof
- `POST /api/registrations/{registration_id}/form-responses` - Submit form responses

## Deployment

### Deploy Frontend (Vercel)
\`\`\`bash
# Connect your GitHub repository to Vercel
# Environment variables:
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
\`\`\`

### Deploy Backend (cPanel)
1. Connect via FTP/SFTP
2. Upload files to appropriate directory
3. Set up Passenger WSGI configuration
4. Configure database connection
5. Set file upload permissions

## File Upload Configuration

Payment proof images are stored on your cPanel server:
- Default location: `/public_html/uploads/`
- Files are stored as: `payment_{registration_id}_{original_filename}`
- Maximum file size: 5MB
- Supported formats: JPG, PNG, PDF

To access uploaded files:
- Via FTP: `/uploads/` directory
- Via browser: `https://yourdomain.com/uploads/{filename}`

## Authentication

The current implementation includes basic user registration/login pages. For production:
1. Implement JWT token-based authentication
2. Add password hashing using `passlib`
3. Implement role-based access control
4. Add session management

\`\`\`python
# Example enhancement in main.py
from passlib.context import CryptContext
from datetime import timedelta, datetime

pwd_context = CryptContext(schemes=["bcrypt"])

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
\`\`\`

## Troubleshooting

### Backend not connecting to frontend
- Check `NEXT_PUBLIC_API_URL` in .env.local
- Ensure backend is running on `http://localhost:8000`
- Check CORS settings in main.py

### Database connection errors
- Verify DATABASE_URL is correct
- Check database credentials
- Ensure database exists
- Run SQL schema

### File upload issues
- Check `/uploads` directory permissions
- Ensure directory is writable
- Verify file size limits
- Check supported file types

### Passenger/cPanel issues
- Check error logs in cPanel
- Verify Python version compatibility
- Ensure dependencies are installed
- Check file permissions (755 for directories, 644 for files)

## Development Tips

### Hot Reload
Frontend automatically reloads when you save changes.

Backend requires manual restart:
\`\`\`bash
# Press Ctrl+C
python main.py
\`\`\`

### Testing Events
1. Create event via admin dashboard
2. Register as different users
3. Upload payment proofs
4. Verify status changes

### Database Migrations
For production changes, create migration scripts:
\`\`\`sql
-- migration_001.sql
ALTER TABLE events ADD COLUMN new_column VARCHAR(255);
\`\`\`

## Performance Optimization

1. **Database Indexing** - Already included in schema
2. **Caching** - Add Redis for session management
3. **CDN** - Use Vercel's edge network for frontend
4. **API Rate Limiting** - Implement in FastAPI middleware
5. **Image Optimization** - Compress payment proof uploads

## Security Considerations

1. **Input Validation** - Always validate user inputs
2. **SQL Injection** - Use SQLAlchemy ORM (already implemented)
3. **CORS** - Currently allows all origins - restrict in production
4. **File Upload** - Validate file types and sizes (already implemented)
5. **Authentication** - Implement proper JWT tokens
6. **HTTPS** - Use SSL certificates (automatic with Vercel)

## Support & Documentation

- FastAPI Docs: `http://localhost:8000/docs`
- Next.js Docs: https://nextjs.org/docs
- SQLAlchemy Docs: https://docs.sqlalchemy.org
\`\`\`

Now let me create an API documentation file:
