package com.projectx.coreapi.course;

import com.projectx.coreapi.common.exception.ConflictException;
import com.projectx.coreapi.common.exception.ResourceNotFoundException;
import com.projectx.coreapi.course.dto.CourseRequest;
import com.projectx.coreapi.course.dto.CourseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    /**
     * Public, active-only course listing. Cached in Redis under "courses" -
     * this is the second required Redis use-case (the first being refresh
     * token storage, see RefreshTokenService). Evicted on any admin write.
     */
    @Cacheable(value = "courses", key = "#pageable.pageNumber + '-' + #pageable.pageSize")
    public Page<CourseResponse> listPublic(Pageable pageable) {
        return courseRepository.findByActiveTrue(pageable).map(CourseResponse::from);
    }

    public CourseResponse getPublicBySlug(String slug) {
        Course course = courseRepository.findBySlugAndActiveTrue(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + slug));
        return CourseResponse.from(course);
    }

    public Page<CourseResponse> listAllForAdmin(Pageable pageable) {
        return courseRepository.findAll(pageable).map(CourseResponse::from);
    }

    public CourseResponse getForAdmin(UUID id) {
        return CourseResponse.from(findOrThrow(id));
    }

    @Transactional
    @CacheEvict(value = "courses", allEntries = true)
    public CourseResponse create(CourseRequest request) {
        if (courseRepository.existsBySlug(request.slug())) {
            throw new ConflictException("A course with slug '" + request.slug() + "' already exists");
        }
        Course course = Course.builder()
                .title(request.title())
                .slug(request.slug())
                .description(request.description())
                .track(request.track())
                .level(request.level())
                .durationWeeks(request.durationWeeks())
                .priceInr(request.priceInr())
                .active(request.active() == null || request.active())
                .build();
        return CourseResponse.from(courseRepository.save(course));
    }

    @Transactional
    @CacheEvict(value = "courses", allEntries = true)
    public CourseResponse update(UUID id, CourseRequest request) {
        Course course = findOrThrow(id);
        if (!course.getSlug().equals(request.slug()) && courseRepository.existsBySlug(request.slug())) {
            throw new ConflictException("A course with slug '" + request.slug() + "' already exists");
        }
        course.setTitle(request.title());
        course.setSlug(request.slug());
        course.setDescription(request.description());
        course.setTrack(request.track());
        course.setLevel(request.level());
        course.setDurationWeeks(request.durationWeeks());
        course.setPriceInr(request.priceInr());
        if (request.active() != null) {
            course.setActive(request.active());
        }
        return CourseResponse.from(courseRepository.save(course));
    }

    @Transactional
    @CacheEvict(value = "courses", allEntries = true)
    public void delete(UUID id) {
        Course course = findOrThrow(id);
        courseRepository.delete(course);
    }

    private Course findOrThrow(UUID id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + id));
    }
}
