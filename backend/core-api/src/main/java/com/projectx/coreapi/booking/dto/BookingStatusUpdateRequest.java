package com.projectx.coreapi.booking.dto;

import com.projectx.coreapi.booking.BookingStatus;
import jakarta.validation.constraints.NotNull;

public record BookingStatusUpdateRequest(
        @NotNull BookingStatus status
) {
}
