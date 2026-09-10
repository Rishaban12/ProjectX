package com.projectx.coreapi.contact.dto;

import com.projectx.coreapi.contact.ContactMessage;

import java.time.Instant;
import java.util.UUID;

public record ContactMessageResponse(
        UUID id,
        String name,
        String email,
        String interest,
        String message,
        boolean handled,
        Instant createdAt
) {
    public static ContactMessageResponse from(ContactMessage c) {
        return new ContactMessageResponse(c.getId(), c.getName(), c.getEmail(), c.getInterest(), c.getMessage(),
                c.isHandled(), c.getCreatedAt());
    }
}
