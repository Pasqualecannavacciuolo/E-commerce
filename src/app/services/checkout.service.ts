import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/Cart';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  /*makePayment(stripeToken: any, id: any, amount: number, email: string): Observable<any> {
    const url = "http://localhost:5000/checkout";
    return this.http.post<any>(url,{token:stripeToken, cartID: id, cartAmount: amount, userEmail: email})
  }*/

  /*sentTotalAmount(id: any, amount: any): Observable<any> {
    const url = `http://localhost:5000/cart_amount/`;
    return this.http.post<any>(url,{amount: amount, cartID: id});
  }*/
}
