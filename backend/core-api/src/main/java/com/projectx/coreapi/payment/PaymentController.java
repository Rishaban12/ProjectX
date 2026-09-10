package com.projectx.coreapi.payment;

import com.projectx.coreapi.payment.dto.CreateOrderRequest;
import com.projectx.coreapi.payment.dto.CreateOrderResponse;
import com.projectx.coreapi.security.CurrentUser;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments/razorpay")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    /** Authenticated or guest checkout - keep-it-simple: identity is optional, contact info travels with the booking/course/resume request itself. */
    @PostMapping("/order")
    public ResponseEntity<CreateOrderResponse> createOrder(@Valid @RequestBody CreateOrderRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(paymentService.createOrder(CurrentUser.id(), request));
    }

    /** Public webhook - Razorpay calls this directly, verified by HMAC signature rather than auth. */
    @PostMapping("/webhook")
    public ResponseEntity<Void> webhook(@RequestBody String rawBody,
                                         @RequestHeader(value = "X-Razorpay-Signature", required = false) String signature) {
        boolean ok = paymentService.processWebhook(rawBody, signature);
        return ok ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }
}
