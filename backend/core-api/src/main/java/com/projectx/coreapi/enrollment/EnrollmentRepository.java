package com.projectx.coreapi.enrollment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EnrollmentRepository extends JpaRepository<Enrollment, UUID> {
    Page<Enrollment> findByStudentId(UUID studentId, Pageable pageable);
    boolean existsByStudentIdAndCourseId(UUID studentId, UUID courseId);
}
