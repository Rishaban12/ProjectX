CREATE TABLE enrollments (
    id           UUID PRIMARY KEY,
    student_id   UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    course_id    UUID NOT NULL REFERENCES courses (id) ON DELETE CASCADE,
    status       VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    enrolled_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_enrollments_student ON enrollments (student_id);
CREATE INDEX idx_enrollments_course ON enrollments (course_id);
