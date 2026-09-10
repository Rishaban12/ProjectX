package com.projectx.coreapi.common.exception;

import org.springframework.http.HttpStatus;

/** Used e.g. when Razorpay keys are not configured. */
public class ServiceUnavailableException extends ApiException {
    public ServiceUnavailableException(String message) {
        super(HttpStatus.SERVICE_UNAVAILABLE, message);
    }
}
