package com.projectx.coreapi.auth;

import com.projectx.coreapi.auth.dto.LoginRequest;
import com.projectx.coreapi.auth.dto.RegisterRequest;
import com.projectx.coreapi.auth.dto.TokenResponse;
import com.projectx.coreapi.common.exception.BadRequestException;
import com.projectx.coreapi.common.exception.ConflictException;
import com.projectx.coreapi.security.JwtService;
import com.projectx.coreapi.user.User;
import com.projectx.coreapi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    @Value("${app.jwt.access-ttl-minutes}")
    private long accessTtlMinutes;

    @Transactional
    public TokenResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ConflictException("An account with this email already exists");
        }
        User user = User.builder()
                .name(request.name())
                .email(request.email().toLowerCase())
                .passwordHash(passwordEncoder.encode(request.password()))
                .role(request.role())
                .build();
        user = userRepository.save(user);
        return issueTokens(user);
    }

    public TokenResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email().toLowerCase(), request.password()));

        User user = userRepository.findByEmail(request.email().toLowerCase())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));
        return issueTokens(user);
    }

    public TokenResponse refresh(String refreshToken) {
        UUID userId = refreshTokenService.resolve(refreshToken)
                .orElseThrow(() -> new BadRequestException("Refresh token is invalid or expired"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BadRequestException("User no longer exists"));

        String rotated = refreshTokenService.rotate(refreshToken, userId);
        String accessToken = jwtService.generateAccessToken(user.getId(), user.getEmail(), user.getRole().name());
        return TokenResponse.of(accessToken, rotated, accessTtlMinutes);
    }

    public void logout(String refreshToken) {
        refreshTokenService.revoke(refreshToken);
    }

    private TokenResponse issueTokens(User user) {
        String accessToken = jwtService.generateAccessToken(user.getId(), user.getEmail(), user.getRole().name());
        String refreshToken = refreshTokenService.issue(user.getId());
        return TokenResponse.of(accessToken, refreshToken, accessTtlMinutes);
    }
}
