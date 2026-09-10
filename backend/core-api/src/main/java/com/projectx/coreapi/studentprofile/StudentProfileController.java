package com.projectx.coreapi.studentprofile;

import com.projectx.coreapi.security.SecurityUser;
import com.projectx.coreapi.studentprofile.dto.StudentProfileRequest;
import com.projectx.coreapi.studentprofile.dto.StudentProfileResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/** Self-service student profile management for the currently authenticated STUDENT user. */
@RestController
@RequestMapping("/api/users/me/student-profile")
@RequiredArgsConstructor
public class StudentProfileController {

    private final StudentProfileService studentProfileService;

    @GetMapping
    public StudentProfileResponse get(@AuthenticationPrincipal SecurityUser principal) {
        return StudentProfileResponse.from(studentProfileService.getOrCreateForUser(principal.getId()));
    }

    @PutMapping
    public StudentProfileResponse upsert(@AuthenticationPrincipal SecurityUser principal,
                                          @Valid @RequestBody StudentProfileRequest request) {
        return StudentProfileResponse.from(studentProfileService.upsert(principal.getId(), request));
    }
}
