package com.projectx.coreapi.resume.dto;

import com.projectx.coreapi.resume.ResumePackage;
import com.projectx.coreapi.resume.ResumeRequest;
import com.projectx.coreapi.resume.ResumeRequestStatus;

import java.time.Instant;
import java.util.UUID;

public record ResumeRequestResponse(
        UUID id,
        ResumePackage packageType,
        ResumeRequestStatus status,
        String notes,
        Instant createdAt
) {
    public static ResumeRequestResponse from(ResumeRequest r) {
        return new ResumeRequestResponse(r.getId(), r.getPackageType(), r.getStatus(), r.getNotes(), r.getCreatedAt());
    }
}
