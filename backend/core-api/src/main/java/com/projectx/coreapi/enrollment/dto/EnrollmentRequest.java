package com.projectx.coreapi.enrollment.dto;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record EnrollmentRequest(
        @NotNull UUID courseId
) {
}
