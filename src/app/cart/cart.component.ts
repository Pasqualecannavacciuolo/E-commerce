import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/Cart';
import { User } from '../models/User';
import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  /** pk_test_ULwOwMs5XE4PhRyAYaUvatlD009SOLlwK2 */
  
  paymentHandler: any = null;
  success: boolean = false
  failure:boolean = false

  cart?: Cart;
  cartTotal: number = 0;
  sessionID = '';
  user!: User;

  constructor(private CartService: CartService, private checkout: CheckoutService, private UserService: UserService) {
    
  }

  ngOnInit(): void {
    let sessionID = window.sessionStorage.getItem('id');
    this.UserService.getUserByID(sessionID).subscribe((result) => { this.user = result });
    this.CartService.getCart(sessionID).subscribe((c) => {
      this.cart = c;
      this.getCartTotal();
    });
  }

  // Calcolo il totale del carrello dell'utente
  getCartTotal() {
    this.cartTotal = 0;
      this.cart?.items.forEach(course => {
        this.cartTotal += course.prezzo;
      });
  }

  // Cancello il corso selezionato
  deleteCourse(idToDelete: any) {
    this.CartService.getCart(window.sessionStorage.getItem('id')).subscribe(
      (res) => {
        if (res.hasOwnProperty('id')) {
          this.cart = res;
          let courses_array = this.cart?.items;
          let cart_obj = {
            id: window.sessionStorage.getItem('id'),
            items: courses_array,
          };
          let remainingArr = cart_obj.items?.filter(data => data.id != idToDelete);
          cart_obj.items = remainingArr;
          this.CartService.deleteFromCart(
            window.sessionStorage.getItem('id'),
            <Cart>cart_obj
          ).subscribe();
          this.cart?.items.filter(function(value){ 
            return value !== idToDelete;
          });
          //this.cart?.items.pop();
          this.getCartTotal();
        }
      }
    );
  }

  makePayment() {
    fetch("http://localhost:5000/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: this.cart?.items,
    }),
  })
    .then(res => {
      this.CartService.deleteCart(window.sessionStorage.getItem('id')).subscribe();
      if (res.ok) return res.json();
      return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
      window.location = url
    })
    .catch(e => {
      console.error(e.error)
    })
  }
  
  
}
