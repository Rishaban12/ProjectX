CREATE TABLE bookings (
    id             UUID PRIMARY KEY,
    user_id        UUID REFERENCES users (id) ON DELETE SET NULL,
    name           VARCHAR(150) NOT NULL,
    email          VARCHAR(255) NOT NULL,
    phone          VARCHAR(30),
    service_type   VARCHAR(30) NOT NULL,
    preferred_date DATE,
    message        TEXT,
    status         VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_bookings_status ON bookings (status);
