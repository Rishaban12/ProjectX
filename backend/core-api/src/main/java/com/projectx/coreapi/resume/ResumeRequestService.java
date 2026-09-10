package com.projectx.coreapi.resume;

import com.projectx.coreapi.common.exception.ResourceNotFoundException;
import com.projectx.coreapi.resume.dto.ResumeRequestRequest;
import com.projectx.coreapi.resume.dto.ResumeRequestResponse;
import com.projectx.coreapi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResumeRequestService {

    private final ResumeRequestRepository resumeRequestRepository;
    private final UserRepository userRepository;

    @Transactional
    public ResumeRequestResponse create(Optional<UUID> userId, ResumeRequestRequest request) {
        ResumeRequest resumeRequest = ResumeRequest.builder()
                .user(userId.flatMap(userRepository::findById).orElse(null))
                .packageType(request.packageType())
                .notes(request.notes())
                .status(ResumeRequestStatus.SUBMITTED)
                .build();
        return ResumeRequestResponse.from(resumeRequestRepository.save(resumeRequest));
    }

    public Page<ResumeRequestResponse> listForAdmin(Pageable pageable) {
        return resumeRequestRepository.findAll(pageable).map(ResumeRequestResponse::from);
    }

    @Transactional
    public ResumeRequestResponse updateStatus(UUID id, ResumeRequestStatus status) {
        ResumeRequest resumeRequest = resumeRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resume request not found: " + id));
        resumeRequest.setStatus(status);
        return ResumeRequestResponse.from(resumeRequestRepository.save(resumeRequest));
    }
}
