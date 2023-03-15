package com.GRP3.BPA.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="course_student")
@AllArgsConstructor
@NoArgsConstructor
public class CourseStudent {
    @Id
    @GeneratedValue
    @Getter @Setter
    private Long id;
    @Getter @Setter
    @JoinColumn(name="banner_id")
    private Student student;
    @Getter @Setter
    @JoinColumn(name="course_id")
    private TeacherCourse teacherCourse;
}
