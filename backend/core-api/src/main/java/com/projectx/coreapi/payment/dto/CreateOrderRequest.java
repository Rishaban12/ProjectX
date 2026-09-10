package com.projectx.coreapi.payment.dto;

import com.projectx.coreapi.payment.PaymentReferenceType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.UUID;

public record CreateOrderRequest(
        @NotNull PaymentReferenceType referenceType,
        @NotNull UUID referenceId,
        @NotNull @DecimalMin(value = "1.0") BigDecimal amount,
        String receiptEmail
) {
}
