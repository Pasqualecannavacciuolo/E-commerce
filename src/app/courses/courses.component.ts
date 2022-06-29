import { Component, OnInit } from '@angular/core';
import { Course } from '../models/Course';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {


  courses: Course[] = []
  filtered_courses: Course[] = [];
  
  data: string = '';

  Users = [{
      "id": 5440,
      "name": "Wanda Lynch",
      "email": "wanda.lynch@example.com"
    }];
  
  constructor(private CourseService: CourseService) { }

  ngOnInit(): void {
    // Ottengo tutti i corsi dall'API
    this.CourseService.getAllCourses().subscribe(res => (
      this.courses = res
    ));
  }

  

}
