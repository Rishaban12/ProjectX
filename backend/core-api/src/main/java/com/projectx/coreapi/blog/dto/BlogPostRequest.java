package com.projectx.coreapi.blog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record BlogPostRequest(
        @NotBlank @Size(max = 250) String title,
        @NotBlank @Size(max = 270) String slug,
        @NotBlank String content,
        @Size(max = 150) String author,
        String tags,
        Boolean published
) {
}
