-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    admin_id INT NOT NULL,
    is_team_event BOOLEAN DEFAULT FALSE,
    team_size INT,
    has_entry_fee BOOLEAN DEFAULT FALSE,
    entry_fee DECIMAL(10, 2),
    payment_details TEXT,
    event_date TIMESTAMP NULL,
    registration_deadline TIMESTAMP NULL,
    max_registrations INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Event Modules Table
CREATE TABLE event_modules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    module_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Module Steps Table
CREATE TABLE module_steps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    module_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    step_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (module_id) REFERENCES event_modules(id) ON DELETE CASCADE
);

-- Step Fields Table
CREATE TABLE step_fields (
    id INT AUTO_INCREMENT PRIMARY KEY,
    step_id INT NOT NULL,
    field_name VARCHAR(255) NOT NULL,
    field_type VARCHAR(50) NOT NULL,
    is_required BOOLEAN DEFAULT TRUE,
    field_order INT DEFAULT 0,
    options TEXT,
    placeholder VARCHAR(255),
    FOREIGN KEY (step_id) REFERENCES module_steps(id) ON DELETE CASCADE
);

-- Event Schedules Table
CREATE TABLE event_schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    activity_title VARCHAR(255) NOT NULL,
    activity_description TEXT,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NULL,
    location VARCHAR(255),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Legacy Form Fields Table (backward compatibility)
CREATE TABLE form_fields (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    field_name VARCHAR(255) NOT NULL,
    field_type VARCHAR(50) NOT NULL,
    is_required BOOLEAN DEFAULT TRUE,
    field_order INT,
    options TEXT,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Registrations Table
CREATE TABLE registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    registration_type VARCHAR(50),
    payment_proof_path VARCHAR(255),
    is_payment_verified BOOLEAN DEFAULT FALSE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending',
    current_step_index INT DEFAULT 0,
    is_complete BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Teams Table
CREATE TABLE teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_id INT UNIQUE NOT NULL,
    team_name VARCHAR(255),
    FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE
);

-- Team Members Table
CREATE TABLE team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_id INT NOT NULL,
    user_id INT NULL,
    member_name VARCHAR(255),
    member_email VARCHAR(255),
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Legacy Form Responses Table
CREATE TABLE form_responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_id INT NOT NULL,
    field_id INT NOT NULL,
    response_value TEXT,
    FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE,
    FOREIGN KEY (field_id) REFERENCES form_fields(id) ON DELETE CASCADE
);

-- Step Field Responses Table
CREATE TABLE step_field_responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_id INT NOT NULL,
    field_id INT NOT NULL,
    response_value TEXT,
    FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE,
    FOREIGN KEY (field_id) REFERENCES step_fields(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_events_admin_id ON events(admin_id);
CREATE INDEX idx_event_modules_event_id ON event_modules(event_id);
CREATE INDEX idx_module_steps_module_id ON module_steps(module_id);
CREATE INDEX idx_step_fields_step_id ON step_fields(step_id);
CREATE INDEX idx_event_schedules_event_id ON event_schedules(event_id);
CREATE INDEX idx_registrations_event_id ON registrations(event_id);
CREATE INDEX idx_registrations_user_id ON registrations(user_id);
CREATE INDEX idx_form_fields_event_id ON form_fields(event_id);
CREATE INDEX idx_form_responses_registration_id ON form_responses(registration_id);
CREATE INDEX idx_step_field_responses_registration_id ON step_field_responses(registration_id);
CREATE INDEX idx_teams_registration_id ON teams(registration_id);
