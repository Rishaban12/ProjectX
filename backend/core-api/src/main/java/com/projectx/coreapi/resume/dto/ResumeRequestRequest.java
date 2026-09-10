package com.projectx.coreapi.resume.dto;

import com.projectx.coreapi.resume.ResumePackage;
import jakarta.validation.constraints.NotNull;

public record ResumeRequestRequest(
        @NotNull ResumePackage packageType,
        String notes
) {
}
