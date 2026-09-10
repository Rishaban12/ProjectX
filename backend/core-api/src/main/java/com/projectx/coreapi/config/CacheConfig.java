package com.projectx.coreapi.config;

import org.springframework.boot.autoconfigure.cache.RedisCacheManagerBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;

import java.time.Duration;

/**
 * Redis-backed Spring Cache configuration. The public course listing
 * (@Cacheable("courses")) is cached here with a short TTL and evicted
 * explicitly on any admin write - this is the second of the two required
 * Redis use-cases (the first being opaque refresh-token storage, see
 * com.projectx.coreapi.auth.RefreshTokenService).
 */
@Configuration
public class CacheConfig {

    @Bean
    public RedisCacheManagerBuilderCustomizer redisCacheManagerBuilderCustomizer() {
        return builder -> builder.cacheDefaults(
                RedisCacheConfiguration.defaultCacheConfig()
                        .entryTtl(Duration.ofMinutes(10))
                        .disableCachingNullValues());
    }
}
