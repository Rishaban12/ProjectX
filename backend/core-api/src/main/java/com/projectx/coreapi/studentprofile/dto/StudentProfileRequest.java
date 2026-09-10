package com.projectx.coreapi.studentprofile.dto;

import jakarta.validation.constraints.Size;

public record StudentProfileRequest(
        @Size(max = 200) String college,
        @Size(max = 200) String courseInterest,
        @Size(max = 30) String phone
) {
}
