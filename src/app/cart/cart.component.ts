import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/Cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart?: Cart;

  constructor(private CartService: CartService) {}

  ngOnInit(): void {
    let sessionID = window.sessionStorage.getItem('id');
    this.CartService.getCart(sessionID).subscribe((c) => (this.cart = c));
  }

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
          window.location.reload();
        }
      }
    );
  }
}
