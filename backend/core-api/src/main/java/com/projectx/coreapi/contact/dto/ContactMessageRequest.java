package com.projectx.coreapi.contact.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactMessageRequest(
        @NotBlank @Size(max = 150) String name,
        @NotBlank @Email @Size(max = 255) String email,
        @Size(max = 200) String interest,
        @NotBlank String message
) {
}
