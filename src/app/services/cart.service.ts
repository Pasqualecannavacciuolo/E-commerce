import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/Cart';
import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart?: Cart;

  constructor(private http: HttpClient) { }

  saveToCart(course: Course): Observable<any> {
    const url = 'http://localhost:3000/cart/';
    return this.http.post(url, course);
  }

  getCart(id: any): Observable<any> {
    const url = `http://localhost:3000/cart/${id}`;
    return this.http.get(url);
  }
}