package com.projectx.coreapi.payment.dto;

import com.projectx.coreapi.payment.Payment;
import com.projectx.coreapi.payment.PaymentReferenceType;
import com.projectx.coreapi.payment.PaymentStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record PaymentResponse(
        UUID id,
        PaymentReferenceType referenceType,
        UUID referenceId,
        BigDecimal amount,
        String currency,
        String provider,
        String providerOrderId,
        String providerPaymentId,
        PaymentStatus status,
        Instant createdAt,
        Instant updatedAt
) {
    public static PaymentResponse from(Payment p) {
        return new PaymentResponse(p.getId(), p.getReferenceType(), p.getReferenceId(), p.getAmount(),
                p.getCurrency(), p.getProvider(), p.getProviderOrderId(), p.getProviderPaymentId(),
                p.getStatus(), p.getCreatedAt(), p.getUpdatedAt());
    }
}
