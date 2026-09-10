package com.projectx.coreapi.course.dto;

import com.projectx.coreapi.course.Track;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record CourseRequest(
        @NotBlank @Size(max = 200) String title,
        @NotBlank @Size(max = 220) String slug,
        String description,
        @NotNull Track track,
        @Size(max = 50) String level,
        @Positive Integer durationWeeks,
        @NotNull @DecimalMin(value = "0.0", inclusive = true) BigDecimal priceInr,
        Boolean active
) {
}
