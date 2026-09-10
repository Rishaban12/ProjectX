CREATE TABLE contact_messages (
    id         UUID PRIMARY KEY,
    name       VARCHAR(150) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    interest   VARCHAR(200),
    message    TEXT NOT NULL,
    handled    BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_contact_messages_handled ON contact_messages (handled);
