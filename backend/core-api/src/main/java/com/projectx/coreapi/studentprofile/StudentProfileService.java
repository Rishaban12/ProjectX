package com.projectx.coreapi.studentprofile;

import com.projectx.coreapi.common.exception.BadRequestException;
import com.projectx.coreapi.studentprofile.dto.StudentProfileRequest;
import com.projectx.coreapi.user.Role;
import com.projectx.coreapi.user.User;
import com.projectx.coreapi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StudentProfileService {

    private final StudentProfileRepository studentProfileRepository;
    private final UserRepository userRepository;

    public StudentProfile getOrCreateForUser(UUID userId) {
        return studentProfileRepository.findByUserId(userId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId).orElseThrow();
                    return StudentProfile.builder().user(user).build();
                });
    }

    @Transactional
    public StudentProfile upsert(UUID userId, StudentProfileRequest request) {
        User user = userRepository.findById(userId).orElseThrow();
        if (user.getRole() != Role.STUDENT) {
            throw new BadRequestException("Only STUDENT accounts have a student profile");
        }
        StudentProfile profile = studentProfileRepository.findByUserId(userId)
                .orElseGet(() -> StudentProfile.builder().user(user).build());
        profile.setCollege(request.college());
        profile.setCourseInterest(request.courseInterest());
        profile.setPhone(request.phone());
        return studentProfileRepository.save(profile);
    }
}
