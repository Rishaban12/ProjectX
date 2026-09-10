package com.projectx.coreapi.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;
import java.util.UUID;

/**
 * Resolves the current user id, if any, from the security context. Used by
 * endpoints that accept both guests and authenticated callers (bookings,
 * resume requests, payments) - the JWT filter still populates the context
 * when a valid bearer token is present even on a permitAll() route.
 */
public final class CurrentUser {

    private CurrentUser() {
    }

    public static Optional<UUID> id() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || !(auth.getPrincipal() instanceof SecurityUser securityUser)) {
            return Optional.empty();
        }
        return Optional.of(securityUser.getId());
    }
}
