package com.projectx.coreapi.payment;

import com.projectx.coreapi.common.exception.BadRequestException;
import com.projectx.coreapi.common.exception.ResourceNotFoundException;
import com.projectx.coreapi.common.exception.ServiceUnavailableException;
import com.projectx.coreapi.payment.dto.CreateOrderRequest;
import com.projectx.coreapi.payment.dto.CreateOrderResponse;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Optional;
import java.util.UUID;

import com.projectx.coreapi.user.UserRepository;

/**
 * Razorpay integration. Order creation persists a CREATED payment row and
 * returns just enough for a future frontend to drive Razorpay Checkout.
 * The webhook verifies the signature and flips the matching payment row to
 * PAID/FAILED. If RAZORPAY_KEY_ID/RAZORPAY_KEY_SECRET are blank, order
 * creation fails fast with 503 rather than the app crashing at startup or
 * on first use.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final RazorpayProperties razorpayProperties;

    @Transactional
    public CreateOrderResponse createOrder(Optional<UUID> userId, CreateOrderRequest request) {
        if (!razorpayProperties.isConfigured()) {
            throw new ServiceUnavailableException(
                    "Razorpay is not configured on this server (RAZORPAY_KEY_ID/RAZORPAY_KEY_SECRET are blank). "
                            + "Set real keys to enable payments.");
        }

        Payment payment = Payment.builder()
                .user(userId.flatMap(userRepository::findById).orElse(null))
                .referenceType(request.referenceType())
                .referenceId(request.referenceId())
                .amount(request.amount())
                .currency("INR")
                .provider("RAZORPAY")
                .status(PaymentStatus.CREATED)
                .build();

        try {
            RazorpayClient client = new RazorpayClient(razorpayProperties.getKeyId(), razorpayProperties.getKeySecret());

            // Razorpay expects amount in the smallest currency unit (paise for INR).
            long amountInPaise = request.amount()
                    .setScale(2, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100))
                    .longValueExact();

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amountInPaise);
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "px-" + UUID.randomUUID());
            orderRequest.put("payment_capture", 1);

            com.razorpay.Order order = client.orders.create(orderRequest);
            payment.setProviderOrderId(order.get("id"));
        } catch (RazorpayException e) {
            log.error("Razorpay order creation failed", e);
            throw new ServiceUnavailableException("Could not create Razorpay order: " + e.getMessage());
        }

        payment = paymentRepository.save(payment);

        return new CreateOrderResponse(
                payment.getId(),
                payment.getProviderOrderId(),
                payment.getAmount(),
                payment.getCurrency(),
                razorpayProperties.getKeyId());
    }

    /**
     * Verifies the X-Razorpay-Signature header against the raw request body
     * (HMAC-SHA256 with RAZORPAY_KEY_SECRET) and updates the matching payment.
     * Returns true if the signature was valid and processed, false otherwise.
     */
    @Transactional
    public boolean processWebhook(String rawBody, String signatureHeader) {
        if (!razorpayProperties.isConfigured()) {
            throw new ServiceUnavailableException("Razorpay is not configured on this server");
        }
        if (signatureHeader == null || signatureHeader.isBlank()) {
            return false;
        }

        boolean valid;
        try {
            valid = Utils.verifyWebhookSignature(rawBody, signatureHeader, razorpayProperties.getKeySecret());
        } catch (RazorpayException e) {
            log.warn("Razorpay webhook signature verification error", e);
            return false;
        }
        if (!valid) {
            return false;
        }

        JSONObject payload = new JSONObject(rawBody);
        String event = payload.optString("event", "");

        JSONObject entity = extractPaymentEntity(payload);
        if (entity == null) {
            // Nothing actionable for this event type; signature was still valid.
            return true;
        }

        String orderId = entity.optString("order_id", null);
        String paymentId = entity.optString("id", null);
        if (orderId == null) {
            return true;
        }

        paymentRepository.findByProviderOrderId(orderId).ifPresentOrElse(payment -> {
            if (event.startsWith("payment.captured") || event.equals("order.paid")) {
                payment.setStatus(PaymentStatus.PAID);
                payment.setProviderPaymentId(paymentId);
            } else if (event.startsWith("payment.failed")) {
                payment.setStatus(PaymentStatus.FAILED);
                payment.setProviderPaymentId(paymentId);
            }
            paymentRepository.save(payment);
        }, () -> log.warn("Received Razorpay webhook for unknown order {}", orderId));

        return true;
    }

    private JSONObject extractPaymentEntity(JSONObject payload) {
        try {
            return payload.getJSONObject("payload").getJSONObject("payment").getJSONObject("entity");
        } catch (Exception e) {
            return null;
        }
    }
}
