import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  logged = false;
  username?: string;
  
  ngOnInit(): void {
    let sessionLogged = window.sessionStorage.getItem('logged');
    if(sessionLogged == 'true') {
      this.username = window.sessionStorage.getItem('username')!;
      this.logged = true;
    }
  }
  title = 'E-commerce';

  logout() {
    let sessionStorageArray = ['username', 'email', 'logged'];
    
    if(this.username) {
      sessionStorageArray.forEach(element => {
        window.sessionStorage.removeItem(element);
      });
    }

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

}
