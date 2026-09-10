package com.projectx.coreapi.common.exception;

import org.springframework.http.HttpStatus;

/** Generic exception carrying an HTTP status, translated by {@link GlobalExceptionHandler}. */
public class ApiException extends RuntimeException {

    private final HttpStatus status;

    public ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
