package com.projectx.coreapi.notification;

import com.projectx.coreapi.notification.dto.NotificationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

/**
 * Clean seam for in-app notifications. Other services (enrollments, bookings,
 * payments, etc.) call {@link #notify} to record an event for a user.
 *
 * Only a DB-persisting implementation exists in this pass - actual email/SMS
 * delivery is out of scope and can be layered in later (e.g. an async
 * listener that also pushes to an email provider) without touching callers.
 */
public interface NotificationService {

    void notify(UUID userId, String type, String title, String body);

    Page<NotificationResponse> listForUser(UUID userId, Pageable pageable);

    void markRead(UUID userId, UUID notificationId);
}
