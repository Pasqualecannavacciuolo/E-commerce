import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../models/Course';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course: Course | undefined;

  constructor(private CourseService: CourseService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const id = params['id'];
      if(id){
        this.CourseService.getCourseById(id).subscribe(course => this.course = course);
      }
    });
  }

}
