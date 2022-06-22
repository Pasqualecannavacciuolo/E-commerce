import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  logged = false;
  username?: string;

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    let sessionLogged = window.sessionStorage.getItem('logged');
    if(sessionLogged == 'true') {
      this.username = window.sessionStorage.getItem('username')!;
      this.logged = true;
    }
  }
  title = 'E-commerce';

  logout() {
    let sessionStorageArray = ['nome', 'cognome', 'data_nascita', 'username', 'email', 'logged'];
    
    if(this.username) {
      sessionStorageArray.forEach(element => {
        window.sessionStorage.removeItem(element);
      });
    }

    setTimeout(() => {
      this.router.navigate(['/home'])
      window.location.reload();
    }, 1000);
  }

}
