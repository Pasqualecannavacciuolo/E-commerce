import { Component, OnInit } from '@angular/core';
import { Course } from '../models/Course';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  api_tags: string[] = [];
  unique_tags: any;

  data: string = '';
  tag_filtering: string = '';

  constructor(private CourseService: CourseService) {}

  ngOnInit(): void {
    // Ottengo tutti i corsi dall'API
    this.CourseService.getAllCourses().subscribe(
      (res) => (
        (this.courses = res),
        // Ottengo i tag di tutti i corsi dal'API
        this.courses.forEach((course) => {
          for (let i = 0; i < course.tags.length; i++) {
            this.api_tags.push(course.tags[i]);
          }
        }),
        // Rimuovo i duplicati
        (this.unique_tags = [...new Set(this.api_tags)]),
        console.log(this.unique_tags)
      )
    );
  }


  setTag(tag: any) {
    this.tag_filtering = tag;
  }

  resetFilters() {
    this.tag_filtering = '';
    this.data = '';
  }
}
