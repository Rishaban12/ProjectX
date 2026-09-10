package com.projectx.coreapi.blog;

import com.projectx.coreapi.blog.dto.BlogPostResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/blog")
@RequiredArgsConstructor
public class BlogPostController {

    private final BlogPostService blogPostService;

    @GetMapping
    public Page<BlogPostResponse> list(Pageable pageable) {
        return blogPostService.listPublished(pageable);
    }

    @GetMapping("/{slug}")
    public BlogPostResponse getBySlug(@PathVariable String slug) {
        return blogPostService.getPublishedBySlug(slug);
    }
}
