CREATE TABLE parties (
    party_id SERIAL PRIMARY KEY,
    party_name VARCHAR(255) NOT NULL,
    party_type VARCHAR(50) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(100),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    booking_number VARCHAR(100) UNIQUE NOT NULL,
    source_channel VARCHAR(50) DEFAULT 'email',
    source_email_id VARCHAR(255),
    source_subject VARCHAR(255),
    auto_created_flag BOOLEAN DEFAULT FALSE,
    intake_status VARCHAR(50) DEFAULT 'received',
    shipper_id INT REFERENCES parties(party_id),
    consignee_id INT REFERENCES parties(party_id),
    origin_port VARCHAR(255),
    destination_port VARCHAR(255),
    cargo_description TEXT,
    cargo_weight DECIMAL(12,2),
    cargo_volume DECIMAL(12,2),
    container_type VARCHAR(100),
    vessel_name VARCHAR(255),
    voyage_number VARCHAR(100),
    etd DATE,
    eta DATE,
    booking_status VARCHAR(50) DEFAULT 'Email Received',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE booking_attachments (
    attachment_id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(booking_id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50),
    file_size BIGINT,
    storage_path TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    extracted_text TEXT,
    classification VARCHAR(100)
);

CREATE TABLE bill_of_lading (
    bl_id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(booking_id) ON DELETE CASCADE,
    bl_number VARCHAR(100) UNIQUE NOT NULL,
    carrier_id INT REFERENCES parties(party_id),
    issued_date TIMESTAMP,
    bl_status VARCHAR(50) DEFAULT 'Draft',
    consignee_name VARCHAR(255),
    cargo_description TEXT,
    container_number VARCHAR(100),
    seal_number VARCHAR(100),
    gross_weight DECIMAL(12,2),
    place_of_issue VARCHAR(255),
    terms TEXT,
    amended_flag BOOLEAN DEFAULT FALSE,
    amendment_reason TEXT
);

CREATE TABLE shipment_events (
    event_id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(booking_id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    event_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    event_notes TEXT,
    created_by VARCHAR(255)
);

CREATE TABLE booking_status_history (
    status_history_id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(booking_id) ON DELETE CASCADE,
    previous_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    changed_by VARCHAR(255),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

CREATE INDEX idx_bookings_status ON bookings(booking_status);
CREATE INDEX idx_bookings_booking_number ON bookings(booking_number);
CREATE INDEX idx_attachments_booking_id ON booking_attachments(booking_id);
CREATE INDEX idx_bl_booking_id ON bill_of_lading(booking_id);
