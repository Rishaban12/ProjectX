CREATE TABLE courses (
    id              UUID PRIMARY KEY,
    title           VARCHAR(200) NOT NULL,
    slug            VARCHAR(220) NOT NULL UNIQUE,
    description     TEXT,
    track           VARCHAR(30)  NOT NULL,
    level           VARCHAR(50),
    duration_weeks  INTEGER,
    price_inr       NUMERIC(12, 2) NOT NULL,
    is_active       BOOLEAN NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_courses_active ON courses (is_active);
CREATE INDEX idx_courses_track ON courses (track);
