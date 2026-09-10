package com.projectx.coreapi.auth.dto;

public record TokenResponse(
        String accessToken,
        String refreshToken,
        String tokenType,
        long expiresInMinutes
) {
    public static TokenResponse of(String accessToken, String refreshToken, long expiresInMinutes) {
        return new TokenResponse(accessToken, refreshToken, "Bearer", expiresInMinutes);
    }
}
