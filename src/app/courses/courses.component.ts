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
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  
  
  constructor(private CourseService: CourseService) { }

  ngOnInit(): void {
    // Ottengo tutti i corsi dall'API
    this.CourseService.getAllCourses().subscribe(data => (
      this.courses = data
    ));
  }

}
