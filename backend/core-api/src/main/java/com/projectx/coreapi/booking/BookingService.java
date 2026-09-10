package com.projectx.coreapi.booking;

import com.projectx.coreapi.booking.dto.BookingRequest;
import com.projectx.coreapi.booking.dto.BookingResponse;
import com.projectx.coreapi.common.exception.ResourceNotFoundException;
import com.projectx.coreapi.user.User;
import com.projectx.coreapi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    @Transactional
    public BookingResponse create(Optional<UUID> userId, BookingRequest request) {
        User user = userId.flatMap(userRepository::findById).orElse(null);
        Booking booking = Booking.builder()
                .user(user)
                .name(request.name())
                .email(request.email())
                .phone(request.phone())
                .serviceType(request.serviceType())
                .preferredDate(request.preferredDate())
                .message(request.message())
                .status(BookingStatus.PENDING)
                .build();
        return BookingResponse.from(bookingRepository.save(booking));
    }

    public Page<BookingResponse> listForAdmin(BookingStatus status, Pageable pageable) {
        Page<Booking> page = status != null
                ? bookingRepository.findByStatus(status, pageable)
                : bookingRepository.findAll(pageable);
        return page.map(BookingResponse::from);
    }

    @Transactional
    public BookingResponse updateStatus(UUID id, BookingStatus status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + id));
        booking.setStatus(status);
        return BookingResponse.from(bookingRepository.save(booking));
    }
}
