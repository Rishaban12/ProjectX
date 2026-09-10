package com.projectx.coreapi.enrollment;

import com.projectx.coreapi.enrollment.dto.EnrollmentRequest;
import com.projectx.coreapi.enrollment.dto.EnrollmentResponse;
import com.projectx.coreapi.security.SecurityUser;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping("/api/enrollments")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<EnrollmentResponse> enroll(@AuthenticationPrincipal SecurityUser principal,
                                                       @Valid @RequestBody EnrollmentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(enrollmentService.enrollSelf(principal.getId(), request));
    }

    @GetMapping("/api/users/me/enrollments")
    public Page<EnrollmentResponse> myEnrollments(@AuthenticationPrincipal SecurityUser principal, Pageable pageable) {
        return enrollmentService.listForStudent(principal.getId(), pageable);
    }
}
