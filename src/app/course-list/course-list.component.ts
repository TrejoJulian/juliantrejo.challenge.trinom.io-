import { Component, OnInit } from '@angular/core';
import { Course } from '../people/model/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit{
  courses: Course[];

  constructor(private courseService: CourseService){}

  ngOnInit(): void {
    this.courseService.fetchCourses()
      .subscribe(courses => {
        this.courses = courses;
      });
  }
}
