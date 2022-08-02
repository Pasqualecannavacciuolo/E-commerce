import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  cart?: Cart;
  cartTotal: number = 0;
  sessionID!: any;
  user!: User;
  currentRoute: string = '';

  constructor(
    private CartService: CartService, 
    private checkout: CheckoutService, 
    private UserService: UserService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.sessionID = window.sessionStorage.getItem('id');
    this.UserService.getUserByID(this.sessionID).subscribe((result) => { this.user = result });
    this.CartService.getCart(this.sessionID).subscribe((c) => {
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
          this.cart!.items = remainingArr!;
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
      if (res.ok) {
        return res.json();
      }
      return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
      window.location = url;
      
        /*this.UserService.getUserByID(this.sessionID).subscribe((res) => {
          if(res.hasOwnProperty('id')) {
            // Res ritorna i dati dell'utente che copia nella variabile user_to_add_transaction
            this.user_to_add_transaction = res;
            
            // Controllo se ci sono state transazioni precedentemente
            if(this.user_to_add_transaction.transactions !== undefined) {
              // Se ci sono state aggiungo alle vecchie transazioni quelle attuali
              this.user_to_add_transaction!.transactions = this.user_to_add_transaction!.transactions;
              let tmp_cart_items = this.cart?.items;
              tmp_cart_items!.forEach((element: any) => {
                let transaction: Transaction = {
                  item: '',
                  cost: 0
                };
      
                transaction.item = element.titolo;
                transaction.cost = element.prezzo;
                this.user_to_add_transaction!.transactions.push(transaction);
              });
            } else { // Se non c'è stata alcuna transazione precedente
              // Popolo la sezione delle transazioni con il carrello attuale
              this.user_to_add_transaction!.transactions = this.cart?.items;
              this.user_to_add_transaction!.transactions.forEach((element: any) => {
              
                let transaction: Transaction = {
                  item: '',
                  cost: 0
                };
      
                transaction.item = element.titolo;
                transaction.cost = element.prezzo;
                transactions_array.push(transaction);
              });
              this.user_to_add_transaction.transactions = transactions_array;
            }
            
            // Aggiungo la transazione
            this.UserService.addTransaction(this.sessionID, this.user_to_add_transaction).subscribe();
          }
        });
        
    
        // Cancello l'intero carrello dell'utente
        this.CartService.deleteCart(window.sessionStorage.getItem('id')).subscribe();*/
      
    })
    .catch(e => {
      console.error(e.error)
    })
  }
  
}