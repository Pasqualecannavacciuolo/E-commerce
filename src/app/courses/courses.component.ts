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
  
  data: string | undefined;

  Users = [{
      "id": 5440,
      "name": "Wanda Lynch",
      "email": "wanda.lynch@example.com"
    },
    {
      "id": 6228,
      "name": "Katrina Graves",
      "email": "katrina.graves@example.com"
    },
    {
      "id": 1654,
      "name": "Louis Daniels",
      "email": "louis.daniels@example.com"
    },
    {
      "id": 1631,
      "name": "Gavin Sullivan",
      "email": "gavin.sullivan@example.com"
    },
    {
      "id": 9880,
      "name": "June Martinez",
      "email": "june.martinez@example.com"
    },
    {
      "id": 8634,
      "name": "Owen Davis",
      "email": "owen.davis@example.com"
    },
    {
      "id": 3918,
      "name": "Megan Harrison",
      "email": "megan.harrison@example.com"
    },
    {
      "id": 3680,
      "name": "Joel Thompson",
      "email": "joel.thompson@example.com"
    },
    {
      "id": 2409,
      "name": "Dora Rose",
      "email": "dora.rose@example.com"
    },
    {
      "id": 4477,
      "name": "Candice Neal",
      "email": "candice.neal@example.com"
    }
  ]
  
  constructor(private CourseService: CourseService) { }

  ngOnInit(): void {
    // Ottengo tutti i corsi dall'API
    this.CourseService.getAllCourses().subscribe(data => (
      this.courses = data,
      console.log(this.courses)
    ));
  }

}
