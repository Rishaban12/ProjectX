package com.projectx.coreapi.notification;

import com.projectx.coreapi.common.exception.ResourceNotFoundException;
import com.projectx.coreapi.notification.dto.NotificationResponse;
import com.projectx.coreapi.user.User;
import com.projectx.coreapi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/** DB-persisting implementation of {@link NotificationService}. No email/SMS sending - out of scope. */
@Service
@RequiredArgsConstructor
public class PersistingNotificationService implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void notify(UUID userId, String type, String title, String body) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        Notification notification = Notification.builder()
                .user(user)
                .type(type)
                .title(title)
                .body(body)
                .read(false)
                .build();
        notificationRepository.save(notification);
    }

    @Override
    public Page<NotificationResponse> listForUser(UUID userId, Pageable pageable) {
        return notificationRepository.findByUserId(userId, pageable).map(NotificationResponse::from);
    }

    @Override
    @Transactional
    public void markRead(UUID userId, UUID notificationId) {
        Notification notification = notificationRepository.findByIdAndUserId(notificationId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));
        notification.setRead(true);
        notificationRepository.save(notification);
    }
}
