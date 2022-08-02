import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../models/Cart';
import { User } from '../models/User';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';


interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  sessionID!: any;
  cart?: Cart;
  user_to_add_transaction?: User;


  constructor(
    private CartService: CartService,
    private UserService: UserService,
    private router: Router
    ) {}

  ngOnInit(): void {
    // Ottengo l'ID di sessione dell'utente
    this.sessionID = window.sessionStorage.getItem('id');
    // Ottengo il carrello dell'utente
    this.CartService.getCart(this.sessionID).subscribe((c) => {
      this.cart = c;
    });
    
    setTimeout(() => {
      this.addTransaction();
    }, 500);
    setTimeout(() => {
      this.deleteCart();
      setTimeout(() => {
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      }, 3500);
    }, 2000);
    
  }

  // Funzione che aggiunge la transazione effettuata nella lista delle transazioni dell'utente
  addTransaction() {
    let transactions_array: Transaction[] = [];

    this.UserService.getUserByID(this.sessionID).subscribe((res) => {
          if(res.hasOwnProperty('id')) {
            // Res ritorna i dati dell'utente che copia nella variabile user_to_add_transaction
            this.user_to_add_transaction = res;
            
            // Controllo se ci sono state transazioni precedentemente
            if(this.user_to_add_transaction.transactions !== undefined) {
              console.log("Ci sono state transazioni");
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
              console.log("Non ci sono state transazioni");
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
  }

  // Funzione che elimina il carrello dell'utente che ha appena comprato i corsi
  deleteCart() {
    // Cancello l'intero carrello dell'utente
    this.CartService.deleteCart(window.sessionStorage.getItem('id')).subscribe();
  }

}
