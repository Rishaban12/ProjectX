package com.projectx.coreapi.blog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface BlogPostRepository extends JpaRepository<BlogPost, UUID> {
    Page<BlogPost> findByPublishedTrue(Pageable pageable);
    Optional<BlogPost> findBySlugAndPublishedTrue(String slug);
    boolean existsBySlug(String slug);
}
