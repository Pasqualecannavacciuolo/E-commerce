import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  /**
   * Funzione che ottiene tutti i metodi dall'API per i corsi
   * @returns l'array dei corsi restituiti dall'API 
   */
  getAllCourses(): Observable<Course[]> {
    const url = 'http://localhost:3000/courses/';
    return this.http.get<Course[]>(url);
  }
}
