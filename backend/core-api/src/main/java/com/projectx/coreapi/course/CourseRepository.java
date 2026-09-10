package com.projectx.coreapi.course;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, UUID> {
    Page<Course> findByActiveTrue(Pageable pageable);
    Optional<Course> findBySlugAndActiveTrue(String slug);
    Optional<Course> findBySlug(String slug);
    boolean existsBySlug(String slug);
}
