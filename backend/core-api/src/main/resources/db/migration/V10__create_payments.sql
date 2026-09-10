CREATE TABLE payments (
    id                  UUID PRIMARY KEY,
    user_id             UUID REFERENCES users (id) ON DELETE SET NULL,
    reference_type      VARCHAR(30) NOT NULL,
    reference_id        UUID,
    amount              NUMERIC(12, 2) NOT NULL,
    currency            VARCHAR(10) NOT NULL DEFAULT 'INR',
    provider            VARCHAR(30) NOT NULL DEFAULT 'RAZORPAY',
    provider_order_id   VARCHAR(100),
    provider_payment_id VARCHAR(100),
    status              VARCHAR(20) NOT NULL DEFAULT 'CREATED',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_payments_provider_order_id ON payments (provider_order_id);
