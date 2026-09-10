CREATE TABLE blog_posts (
    id         UUID PRIMARY KEY,
    title      VARCHAR(250) NOT NULL,
    slug       VARCHAR(270) NOT NULL UNIQUE,
    content    TEXT NOT NULL,
    author     VARCHAR(150),
    tags       VARCHAR(500),
    published  BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_blog_posts_published ON blog_posts (published);
