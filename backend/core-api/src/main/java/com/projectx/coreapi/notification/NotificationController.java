package com.projectx.coreapi.notification;

import com.projectx.coreapi.notification.dto.NotificationResponse;
import com.projectx.coreapi.security.SecurityUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users/me/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public Page<NotificationResponse> list(@AuthenticationPrincipal SecurityUser principal, Pageable pageable) {
        return notificationService.listForUser(principal.getId(), pageable);
    }

    @PatchMapping("/{id}/read")
    public void markRead(@AuthenticationPrincipal SecurityUser principal, @PathVariable UUID id) {
        notificationService.markRead(principal.getId(), id);
    }
}
