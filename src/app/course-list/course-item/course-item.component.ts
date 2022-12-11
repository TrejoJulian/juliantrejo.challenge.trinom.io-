import { Component, Input } from '@angular/core';
import { Course } from 'src/app/people/model/course.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent {
  @Input() course: Course;
}
