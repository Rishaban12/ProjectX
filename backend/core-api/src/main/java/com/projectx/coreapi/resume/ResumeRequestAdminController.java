package com.projectx.coreapi.resume;

import com.projectx.coreapi.resume.dto.ResumeRequestResponse;
import com.projectx.coreapi.resume.dto.ResumeRequestStatusUpdateRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin/resume-requests")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class ResumeRequestAdminController {

    private final ResumeRequestService resumeRequestService;

    @GetMapping
    public Page<ResumeRequestResponse> list(Pageable pageable) {
        return resumeRequestService.listForAdmin(pageable);
    }

    @PatchMapping("/{id}/status")
    public ResumeRequestResponse updateStatus(@PathVariable UUID id, @Valid @RequestBody ResumeRequestStatusUpdateRequest request) {
        return resumeRequestService.updateStatus(id, request.status());
    }
}
