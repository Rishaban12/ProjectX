package com.projectx.coreapi.booking.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

import com.projectx.coreapi.booking.ServiceType;

public record BookingRequest(
        @NotBlank @Size(max = 150) String name,
        @NotBlank @Email @Size(max = 255) String email,
        @Size(max = 30) String phone,
        @NotNull ServiceType serviceType,
        LocalDate preferredDate,
        String message
) {
}
