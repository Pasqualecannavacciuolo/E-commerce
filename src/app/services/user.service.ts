import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user?: User;

  constructor(private http: HttpClient) { }

  saveUser(user: User): Observable<any> {
    const url = `http://localhost:3000/users/`;
    return this.http.post(url, user);
  }

  getUserByID(id: any): Observable<any> {
    const url = `http://localhost:3000/users/${id}`;
    return this.http.get<User>(url);
  }

  
  getAllUsers(): Observable<User[]> {
    const url = 'http://localhost:3000/users/';
    return this.http.get<User[]>(url);
  }

}
