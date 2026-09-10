package com.projectx.coreapi.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

/**
 * Opaque refresh tokens stored in Redis (key -> user id, TTL = JWT_REFRESH_TTL_DAYS).
 * This is the first of the two required Redis use-cases (the second being the
 * @Cacheable("courses") public listing cache, see CacheConfig).
 *
 * Refresh tokens are random strings, NOT JWTs, so they can be revoked/rotated
 * server-side simply by deleting/replacing the Redis key.
 */
@Service
public class RefreshTokenService {

    private static final String KEY_PREFIX = "refresh_token:";
    private static final SecureRandom RANDOM = new SecureRandom();

    private final StringRedisTemplate redisTemplate;
    private final long refreshTtlDays;

    public RefreshTokenService(StringRedisTemplate redisTemplate,
                                @Value("${app.jwt.refresh-ttl-days}") long refreshTtlDays) {
        this.redisTemplate = redisTemplate;
        this.refreshTtlDays = refreshTtlDays;
    }

    public String issue(UUID userId) {
        String token = generateToken();
        redisTemplate.opsForValue().set(KEY_PREFIX + token, userId.toString(), Duration.ofDays(refreshTtlDays));
        return token;
    }

    public Optional<UUID> resolve(String token) {
        String value = redisTemplate.opsForValue().get(KEY_PREFIX + token);
        return Optional.ofNullable(value).map(UUID::fromString);
    }

    public void revoke(String token) {
        redisTemplate.delete(KEY_PREFIX + token);
    }

    /** Rotates a refresh token: revokes the old one and issues a fresh one for the same user. */
    public String rotate(String oldToken, UUID userId) {
        revoke(oldToken);
        return issue(userId);
    }

    private String generateToken() {
        byte[] bytes = new byte[48];
        RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes) + "-" + UUID.randomUUID();
    }
}
