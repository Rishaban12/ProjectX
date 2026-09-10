CREATE TABLE student_profiles (
    id              UUID PRIMARY KEY,
    user_id         UUID NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,
    college         VARCHAR(200),
    course_interest VARCHAR(200),
    phone           VARCHAR(30)
);
