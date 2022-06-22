import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  nome!: string | null;
  cognome!: string | null;
  data_nascita!: string | null;
  username!: string | null;
  email!: string | null;


  constructor() { }

  ngOnInit(): void {
    this.nome = window.sessionStorage.getItem('nome');
    this.cognome = window.sessionStorage.getItem('cognome');
    this.data_nascita = window.sessionStorage.getItem('data_nascita');
    this.username = window.sessionStorage.getItem('username');
    this.email = window.sessionStorage.getItem('email');
  }

}
