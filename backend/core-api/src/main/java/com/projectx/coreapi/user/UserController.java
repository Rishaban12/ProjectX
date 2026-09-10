package com.projectx.coreapi.user;

import com.projectx.coreapi.security.SecurityUser;
import com.projectx.coreapi.user.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    @GetMapping("/me")
    public UserResponse me(@AuthenticationPrincipal SecurityUser principal) {
        return UserResponse.from(principal.getUser());
    }
}
