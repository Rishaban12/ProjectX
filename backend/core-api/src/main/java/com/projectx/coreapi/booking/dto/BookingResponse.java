package com.projectx.coreapi.booking.dto;

import com.projectx.coreapi.booking.Booking;
import com.projectx.coreapi.booking.BookingStatus;
import com.projectx.coreapi.booking.ServiceType;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record BookingResponse(
        UUID id,
        String name,
        String email,
        String phone,
        ServiceType serviceType,
        LocalDate preferredDate,
        String message,
        BookingStatus status,
        Instant createdAt
) {
    public static BookingResponse from(Booking b) {
        return new BookingResponse(b.getId(), b.getName(), b.getEmail(), b.getPhone(), b.getServiceType(),
                b.getPreferredDate(), b.getMessage(), b.getStatus(), b.getCreatedAt());
    }
}
