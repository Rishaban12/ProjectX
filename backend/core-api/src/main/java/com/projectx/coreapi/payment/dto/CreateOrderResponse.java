package com.projectx.coreapi.payment.dto;

import java.math.BigDecimal;
import java.util.UUID;

/** Enough for a future frontend to drive Razorpay Checkout. */
public record CreateOrderResponse(
        UUID paymentId,
        String razorpayOrderId,
        BigDecimal amount,
        String currency,
        String razorpayKeyId
) {
}
