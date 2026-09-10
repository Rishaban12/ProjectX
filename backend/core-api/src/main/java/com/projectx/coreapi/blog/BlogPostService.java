package com.projectx.coreapi.blog;

import com.projectx.coreapi.blog.dto.BlogPostRequest;
import com.projectx.coreapi.blog.dto.BlogPostResponse;
import com.projectx.coreapi.common.exception.ConflictException;
import com.projectx.coreapi.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BlogPostService {

    private final BlogPostRepository blogPostRepository;

    public Page<BlogPostResponse> listPublished(Pageable pageable) {
        return blogPostRepository.findByPublishedTrue(pageable).map(BlogPostResponse::from);
    }

    public BlogPostResponse getPublishedBySlug(String slug) {
        BlogPost post = blogPostRepository.findBySlugAndPublishedTrue(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found: " + slug));
        return BlogPostResponse.from(post);
    }

    public Page<BlogPostResponse> listAllForAdmin(Pageable pageable) {
        return blogPostRepository.findAll(pageable).map(BlogPostResponse::from);
    }

    public BlogPostResponse getForAdmin(UUID id) {
        return BlogPostResponse.from(findOrThrow(id));
    }

    @Transactional
    public BlogPostResponse create(BlogPostRequest request) {
        if (blogPostRepository.existsBySlug(request.slug())) {
            throw new ConflictException("A blog post with slug '" + request.slug() + "' already exists");
        }
        BlogPost post = BlogPost.builder()
                .title(request.title())
                .slug(request.slug())
                .content(request.content())
                .author(request.author())
                .tags(request.tags())
                .published(request.published() != null && request.published())
                .build();
        return BlogPostResponse.from(blogPostRepository.save(post));
    }

    @Transactional
    public BlogPostResponse update(UUID id, BlogPostRequest request) {
        BlogPost post = findOrThrow(id);
        if (!post.getSlug().equals(request.slug()) && blogPostRepository.existsBySlug(request.slug())) {
            throw new ConflictException("A blog post with slug '" + request.slug() + "' already exists");
        }
        post.setTitle(request.title());
        post.setSlug(request.slug());
        post.setContent(request.content());
        post.setAuthor(request.author());
        post.setTags(request.tags());
        if (request.published() != null) {
            post.setPublished(request.published());
        }
        return BlogPostResponse.from(blogPostRepository.save(post));
    }

    @Transactional
    public void delete(UUID id) {
        blogPostRepository.delete(findOrThrow(id));
    }

    private BlogPost findOrThrow(UUID id) {
        return blogPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found: " + id));
    }
}
