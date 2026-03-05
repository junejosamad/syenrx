# Event Management API Documentation

## Base URL
- Development: `http://localhost:8000`
- Production: `https://yourdomain.com`

## Authentication
Currently, admin_id is passed in request body. For production, implement JWT tokens.

## Endpoints

### Health Check
\`\`\`
GET /api/health
Response: { "status": "ok", "message": "Event Management API is running" }
\`\`\`

### User Registration
\`\`\`
POST /api/users/register

Request Body:
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword"
}

Response:
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "is_admin": false
}
\`\`\`

### Get User
\`\`\`
GET /api/users/{user_id}

Response:
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "is_admin": false
}
\`\`\`

### List Events
\`\`\`
GET /api/events

Response:
[
  {
    "id": 1,
    "title": "Hackathon 2024",
    "description": "Annual coding competition",
    "is_team_event": true,
    "team_size": 4,
    "has_entry_fee": true,
    "entry_fee": 100,
    "event_date": "2024-06-15T09:00:00",
    "registration_deadline": "2024-06-01T23:59:59"
  }
]
\`\`\`

### Get Event Details
\`\`\`
GET /api/events/{event_id}

Response: { event object }
\`\`\`

### Create Event
\`\`\`
POST /api/events

Request Body:
{
  "admin_id": 1,
  "title": "Tech Summit 2024",
  "description": "Annual technology conference",
  "is_team_event": false,
  "team_size": null,
  "has_entry_fee": true,
  "entry_fee": 50,
  "payment_details": "Account: 1234567890\nIFSC: EXPL0001\nUPI: tech@upi",
  "event_date": "2024-06-15T09:00:00",
  "registration_deadline": "2024-06-01T23:59:59",
  "max_registrations": 500
}

Response:
{
  "id": 1,
  "title": "Tech Summit 2024",
  ...
}
\`\`\`

### Update Event
\`\`\`
PUT /api/events/{event_id}

Request Body: (same as create)
Response: { updated event object }
\`\`\`

### Delete Event
\`\`\`
DELETE /api/events/{event_id}

Request Body:
{
  "admin_id": 1
}

Response: { "message": "Event deleted successfully" }
\`\`\`

### Add Form Field
\`\`\`
POST /api/events/{event_id}/form-fields

Request Body:
{
  "admin_id": 1,
  "field_name": "College Name",
  "field_type": "text",
  "is_required": true,
  "field_order": 1,
  "options": null
}

Response: { field object }
\`\`\`

### Get Form Fields
\`\`\`
GET /api/events/{event_id}/form-fields

Response:
[
  {
    "id": 1,
    "event_id": 1,
    "field_name": "College Name",
    "field_type": "text",
    "is_required": true,
    "field_order": 1
  }
]
\`\`\`

### Delete Form Field
\`\`\`
DELETE /api/form-fields/{field_id}

Request Body:
{
  "admin_id": 1
}

Response: { "message": "Field deleted" }
\`\`\`

### Create Registration
\`\`\`
POST /api/registrations

Request Body:
{
  "user_id": 1,
  "event_id": 1,
  "registration_type": "individual",
  "team_name": null,
  "team_members": null
}

Response:
{
  "id": 1,
  "message": "Registration created"
}
\`\`\`

### For Team Registration
\`\`\`
POST /api/registrations

Request Body:
{
  "user_id": 1,
  "event_id": 1,
  "registration_type": "team",
  "team_name": "Tech Wizards",
  "team_members": [
    { "name": "Alice", "email": "alice@example.com" },
    { "name": "Bob", "email": "bob@example.com" },
    { "name": "Charlie", "email": "charlie@example.com" }
  ]
}

Response:
{
  "id": 1,
  "message": "Registration created"
}
\`\`\`

### Get Event Registrations
\`\`\`
GET /api/registrations/event/{event_id}

Request Body:
{
  "admin_id": 1
}

Response:
[
  {
    "id": 1,
    "event_id": 1,
    "user_id": 1,
    "registration_type": "individual",
    "status": "pending",
    "payment_proof_path": null,
    "is_payment_verified": false
  }
]
\`\`\`

### Update Registration Status
\`\`\`
PUT /api/registrations/{registration_id}/status

Request Body:
{
  "admin_id": 1,
  "status": "confirmed"
}

Response: { "message": "Status updated" }
\`\`\`

### Upload Payment Proof
\`\`\`
POST /api/registrations/{registration_id}/upload-payment-proof

Request: multipart/form-data
- file: (binary image or PDF)

Response:
{
  "filename": "payment_receipt.jpg",
  "message": "Payment proof uploaded"
}
\`\`\`

### Get Payment Proof Path
\`\`\`
GET /api/registrations/{registration_id}/payment-proof

Response:
{
  "path": "uploads/payment_1_receipt.jpg"
}
\`\`\`

### Submit Form Responses
\`\`\`
POST /api/registrations/{registration_id}/form-responses

Request Body:
{
  "1": "Indian Institute of Technology",
  "2": "2024",
  "3": "Computer Science"
}

Response: { "message": "Form responses saved" }
\`\`\`

### Get Form Responses
\`\`\`
GET /api/registrations/{registration_id}/form-responses

Response:
[
  {
    "id": 1,
    "registration_id": 1,
    "field_id": 1,
    "response_value": "Indian Institute of Technology"
  }
]
\`\`\`

## Error Responses

All errors follow this format:
\`\`\`json
{
  "detail": "Error message describing what went wrong"
}
\`\`\`

### Common HTTP Status Codes
- `200 OK` - Request successful
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input
- `403 Forbidden` - Not authorized
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error
