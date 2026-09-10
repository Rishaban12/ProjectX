package com.projectx.coreapi.resume;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ResumeRequestRepository extends JpaRepository<ResumeRequest, UUID> {
}
