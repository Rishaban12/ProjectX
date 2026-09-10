CREATE TABLE resume_requests (
    id           UUID PRIMARY KEY,
    user_id      UUID REFERENCES users (id) ON DELETE SET NULL,
    package_type VARCHAR(30) NOT NULL,
    status       VARCHAR(20) NOT NULL DEFAULT 'SUBMITTED',
    notes        TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
