package com.projectx.coreapi.enrollment;

import com.projectx.coreapi.common.exception.ConflictException;
import com.projectx.coreapi.common.exception.ResourceNotFoundException;
import com.projectx.coreapi.course.Course;
import com.projectx.coreapi.course.CourseRepository;
import com.projectx.coreapi.enrollment.dto.EnrollmentRequest;
import com.projectx.coreapi.enrollment.dto.EnrollmentResponse;
import com.projectx.coreapi.notification.NotificationService;
import com.projectx.coreapi.user.User;
import com.projectx.coreapi.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Transactional
    public EnrollmentResponse enrollSelf(UUID studentId, EnrollmentRequest request) {
        if (enrollmentRepository.existsByStudentIdAndCourseId(studentId, request.courseId())) {
            throw new ConflictException("Already enrolled in this course");
        }
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Course course = courseRepository.findById(request.courseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        Enrollment enrollment = Enrollment.builder()
                .student(student)
                .course(course)
                .status(EnrollmentStatus.PENDING)
                .build();
        enrollment = enrollmentRepository.save(enrollment);

        notificationService.notify(student.getId(), "ENROLLMENT",
                "Enrollment received", "You've enrolled in " + course.getTitle() + ". We'll confirm shortly.");

        return EnrollmentResponse.from(enrollment);
    }

    public Page<EnrollmentResponse> listForStudent(UUID studentId, Pageable pageable) {
        return enrollmentRepository.findByStudentId(studentId, pageable).map(EnrollmentResponse::from);
    }

    public Page<EnrollmentResponse> listForAdmin(Pageable pageable) {
        return enrollmentRepository.findAll(pageable).map(EnrollmentResponse::from);
    }
}
