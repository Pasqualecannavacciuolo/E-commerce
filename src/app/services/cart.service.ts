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

  saveToCart(cart: Cart): Observable<any> {
    const url = 'http://localhost:3000/cart/';
    return this.http.post(url, cart);
  }

  getCart(id: any): Observable<any> {
    const url = `http://localhost:3000/cart/${id}`;
    return this.http.get(url);
  }

  addItem(id: any, cart: Cart): Observable<any> {
    const url = `http://localhost:3000/cart/${id}`;
    return this.http.put(url, cart);
  }

  deleteFromCart(id: any, cart: Cart) {
    const url = `http://localhost:3000/cart/${id}`;
    return this.http.put(url, cart);
  }
}