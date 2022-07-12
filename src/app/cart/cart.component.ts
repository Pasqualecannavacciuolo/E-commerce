import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    this.invokeStripe();
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
          this.cart?.items.pop();
          this.getCartTotal();
        }
      }
    );
  }

  makePayment(amount: any) {
      const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_ULwOwMs5XE4PhRyAYaUvatlD009SOLlwK2',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentstripe(stripeToken);
      },
    });
    const paymentstripe = (stripeToken: any) => {
      
      this.checkout.makePayment(stripeToken, window.sessionStorage.getItem('id'), amount, this.user?.email).subscribe((data: any) => {
        console.log(data);
        //this.checkout.sentTotalAmount(window.sessionStorage.getItem('id'), amount).subscribe();
        if (data.data === "success") {
          this.success = true
        }
        else {
          this.failure = true
        }
      });
    };
    paymentHandler.open({
      name: 'Il tuo carrello',
      description: 'Stai comprando tutti i tuoi corsi',
      amount: amount * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_ULwOwMs5XE4PhRyAYaUvatlD009SOLlwK2',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
  
}
