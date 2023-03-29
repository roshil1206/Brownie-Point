package com.GRP3.BPA.repository.course;

import com.GRP3.BPA.model.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    Course findByCourseId(String courseId);
    List<Course> findAllByCourseIdIn(List<String> courseIds);

    List<Course> findByTeacherTeacherId(String teacherId);

    List<Course> findByTeacherTeacherIdAndCourseIdIn(String teacherId, List<String> courseIds);
    Course findByTeacherTeacherIdAndCourseId(String teacherId, String courseId);
}
