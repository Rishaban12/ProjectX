package com.projectx.coreapi.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

/**
 * Issues and validates short-lived JWT access tokens (HS256, signed with JWT_SECRET).
 * Refresh tokens are NOT JWTs - see {@link com.projectx.coreapi.auth.RefreshTokenService}
 * which stores an opaque random string in Redis instead.
 */
@Service
public class JwtService {

    private final SecretKey key;
    private final long accessTtlMinutes;

    public JwtService(
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.access-ttl-minutes}") long accessTtlMinutes) {
        // HS256 requires a key of at least 256 bits; pad/hash short dev secrets defensively.
        byte[] rawKey = secret.getBytes(StandardCharsets.UTF_8);
        this.key = Keys.hmacShaKeyFor(normalizeKey(rawKey));
        this.accessTtlMinutes = accessTtlMinutes;
    }

    private static byte[] normalizeKey(byte[] rawKey) {
        if (rawKey.length >= 32) {
            return rawKey;
        }
        byte[] padded = new byte[32];
        System.arraycopy(rawKey, 0, padded, 0, rawKey.length);
        return padded;
    }

    public String generateAccessToken(UUID userId, String email, String role) {
        Instant now = Instant.now();
        return Jwts.builder()
                .subject(userId.toString())
                .claims(Map.of("email", email, "role", role))
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(accessTtlMinutes, ChronoUnit.MINUTES)))
                .signWith(key)
                .compact();
    }

    public Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public UUID extractUserId(String token) {
        return UUID.fromString(parseClaims(token).getSubject());
    }

    public boolean isValid(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
