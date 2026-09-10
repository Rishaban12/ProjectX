package com.projectx.coreapi.blog.dto;

import com.projectx.coreapi.blog.BlogPost;

import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;

public record BlogPostResponse(
        UUID id,
        String title,
        String slug,
        String content,
        String author,
        String tags,
        boolean published,
        Instant createdAt,
        Instant updatedAt
) implements Serializable {
    public static BlogPostResponse from(BlogPost b) {
        return new BlogPostResponse(b.getId(), b.getTitle(), b.getSlug(), b.getContent(), b.getAuthor(),
                b.getTags(), b.isPublished(), b.getCreatedAt(), b.getUpdatedAt());
    }
}
