package com.projectx.coreapi.config;

import com.projectx.coreapi.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

/**
 * Stateless JWT security. Role-based access control:
 * - /api/auth/**, /api/courses/**, /api/blog/**, /api/bookings, /api/contact,
 *   /api/resume-requests, /api/payments/razorpay/webhook, actuator/health and
 *   swagger docs are public.
 * - /api/admin/** requires ROLE_ADMIN.
 * - Everything else requires an authenticated user; finer-grained role checks
 *   (e.g. ROLE_STUDENT for enrollments) are applied with @PreAuthorize at the
 *   method level (see @EnableMethodSecurity below).
 *
 * NOTE on "admin dashboard": for this pass, the admin dashboard requirement is
 * fulfilled as protected REST endpoints under /api/admin/** plus Swagger UI
 * (/swagger-ui.html) as the practical operator view. No separate admin
 * frontend application was built - a dedicated admin UI can be added later
 * against these same endpoints.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CorsConfigurationSource corsConfigurationSource;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/auth/**",
                                "/actuator/health", "/actuator/health/**",
                                "/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**"
                        ).permitAll()
                        .requestMatchers("GET", "/api/courses/**").permitAll()
                        .requestMatchers("GET", "/api/blog/**").permitAll()
                        .requestMatchers("POST", "/api/bookings").permitAll()
                        .requestMatchers("POST", "/api/contact").permitAll()
                        .requestMatchers("POST", "/api/resume-requests").permitAll()
                        .requestMatchers("POST", "/api/payments/razorpay/webhook").permitAll()
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
