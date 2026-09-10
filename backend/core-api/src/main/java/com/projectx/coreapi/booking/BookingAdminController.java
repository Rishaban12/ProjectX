package com.projectx.coreapi.booking;

import com.projectx.coreapi.booking.dto.BookingResponse;
import com.projectx.coreapi.booking.dto.BookingStatusUpdateRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin/bookings")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class BookingAdminController {

    private final BookingService bookingService;

    @GetMapping
    public Page<BookingResponse> list(@RequestParam(required = false) BookingStatus status, Pageable pageable) {
        return bookingService.listForAdmin(status, pageable);
    }

    @PatchMapping("/{id}/status")
    public BookingResponse updateStatus(@PathVariable UUID id, @Valid @RequestBody BookingStatusUpdateRequest request) {
        return bookingService.updateStatus(id, request.status());
    }
}
