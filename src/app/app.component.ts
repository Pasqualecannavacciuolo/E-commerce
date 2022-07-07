import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from './models/Cart';
import { User } from './models/User';
import { CartService } from './services/cart.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  logged = false;
  user?: User;
  cart: Cart | undefined;
  cartItems: number | undefined;

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  constructor(private CartService: CartService ,private router: Router, private UserService: UserService) {}

  ngOnInit(): void {
    /**
     * Ottengo l'id dal session storage
     */
    if (window.sessionStorage.getItem('id')) {
      let sessionid = window.sessionStorage.getItem('id');

      this.UserService.getUserByID(sessionid).subscribe((u) => (this.user = u));

      let sessionLogged = window.sessionStorage.getItem('logged');

      if (sessionLogged == 'true') {
        this.logged = true;
        let sessionID = window.sessionStorage.getItem('id');
        this.CartService.getCart(sessionID).subscribe(c => this.cartItems = c.items.length);
      }
      
    }
  }
  title = 'E-commerce';

  logout() {
    let sessionStorageArray = ['id', 'logged'];

    if (this.user?.username) {
      sessionStorageArray.forEach((element) => {
        window.sessionStorage.removeItem(element);
      });
    }

    setTimeout(() => {
      this.router.navigate(['/home']);
      window.location.reload();
    }, 1000);
  }
}
