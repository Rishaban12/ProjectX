package com.projectx.coreapi.blog;

import com.projectx.coreapi.blog.dto.BlogPostRequest;
import com.projectx.coreapi.blog.dto.BlogPostResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin/blog")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class BlogPostAdminController {

    private final BlogPostService blogPostService;

    @GetMapping
    public Page<BlogPostResponse> list(Pageable pageable) {
        return blogPostService.listAllForAdmin(pageable);
    }

    @GetMapping("/{id}")
    public BlogPostResponse get(@PathVariable UUID id) {
        return blogPostService.getForAdmin(id);
    }

    @PostMapping
    public ResponseEntity<BlogPostResponse> create(@Valid @RequestBody BlogPostRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(blogPostService.create(request));
    }

    @PutMapping("/{id}")
    public BlogPostResponse update(@PathVariable UUID id, @Valid @RequestBody BlogPostRequest request) {
        return blogPostService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        blogPostService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
