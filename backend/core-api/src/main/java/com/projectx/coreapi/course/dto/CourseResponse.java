package com.projectx.coreapi.course.dto;

import com.projectx.coreapi.course.Course;
import com.projectx.coreapi.course.Track;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record CourseResponse(
        UUID id,
        String title,
        String slug,
        String description,
        Track track,
        String level,
        Integer durationWeeks,
        BigDecimal priceInr,
        boolean active,
        Instant createdAt
) implements Serializable {
    public static CourseResponse from(Course c) {
        return new CourseResponse(c.getId(), c.getTitle(), c.getSlug(), c.getDescription(), c.getTrack(),
                c.getLevel(), c.getDurationWeeks(), c.getPriceInr(), c.isActive(), c.getCreatedAt());
    }
}
