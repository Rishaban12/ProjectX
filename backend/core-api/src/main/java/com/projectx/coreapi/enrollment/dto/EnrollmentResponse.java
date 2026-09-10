package com.projectx.coreapi.enrollment.dto;

import com.projectx.coreapi.enrollment.Enrollment;
import com.projectx.coreapi.enrollment.EnrollmentStatus;

import java.time.Instant;
import java.util.UUID;

public record EnrollmentResponse(
        UUID id,
        UUID studentId,
        String studentName,
        UUID courseId,
        String courseTitle,
        EnrollmentStatus status,
        Instant enrolledAt
) {
    public static EnrollmentResponse from(Enrollment e) {
        return new EnrollmentResponse(
                e.getId(),
                e.getStudent().getId(),
                e.getStudent().getName(),
                e.getCourse().getId(),
                e.getCourse().getTitle(),
                e.getStatus(),
                e.getEnrolledAt());
    }
}
