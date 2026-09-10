package com.projectx.coreapi.course;

import com.projectx.coreapi.course.dto.CourseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Public course browsing endpoints. */
@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public Page<CourseResponse> list(Pageable pageable) {
        return courseService.listPublic(pageable);
    }

    @GetMapping("/{slug}")
    public CourseResponse getBySlug(@PathVariable String slug) {
        return courseService.getPublicBySlug(slug);
    }
}
