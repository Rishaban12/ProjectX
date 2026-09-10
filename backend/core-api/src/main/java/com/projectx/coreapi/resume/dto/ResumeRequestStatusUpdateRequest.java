package com.projectx.coreapi.resume.dto;

import com.projectx.coreapi.resume.ResumeRequestStatus;
import jakarta.validation.constraints.NotNull;

public record ResumeRequestStatusUpdateRequest(
        @NotNull ResumeRequestStatus status
) {
}
