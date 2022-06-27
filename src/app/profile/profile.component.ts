import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user!: any;

  nome!: string | null;
  cognome!: string | null;
  data_nascita!: string | null;
  username!: string | null;
  email!: string | null;

  constructor(private UserService: UserService) {}

  ngOnInit() {
    /**
     * Ottengo l'id dal session storage
     */
    let sessionid = window.sessionStorage.getItem('id');

    
    this.user = this.UserService.getUserByID(sessionid).subscribe((result) => {
      this.user = result;

      this.nome = this.user!.nome;
      this.cognome = this.user!.cognome;
      this.data_nascita = this.user!.data_nascita;
      this.username = this.user!.username;
      this.email = this.user!.email;
    })
    
    
  }

}
