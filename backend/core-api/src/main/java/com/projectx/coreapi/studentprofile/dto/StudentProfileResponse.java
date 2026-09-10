package com.projectx.coreapi.studentprofile.dto;

import com.projectx.coreapi.studentprofile.StudentProfile;

import java.util.UUID;

public record StudentProfileResponse(
        UUID id,
        String college,
        String courseInterest,
        String phone
) {
    public static StudentProfileResponse from(StudentProfile p) {
        return new StudentProfileResponse(p.getId(), p.getCollege(), p.getCourseInterest(), p.getPhone());
    }
}
