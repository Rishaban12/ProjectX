package com.projectx.coreapi.resume;

import com.projectx.coreapi.resume.dto.ResumeRequestRequest;
import com.projectx.coreapi.resume.dto.ResumeRequestResponse;
import com.projectx.coreapi.security.CurrentUser;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Public/authenticated resume-studio intake. */
@RestController
@RequestMapping("/api/resume-requests")
@RequiredArgsConstructor
public class ResumeRequestController {

    private final ResumeRequestService resumeRequestService;

    @PostMapping
    public ResponseEntity<ResumeRequestResponse> create(@Valid @RequestBody ResumeRequestRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(resumeRequestService.create(CurrentUser.id(), request));
    }
}
