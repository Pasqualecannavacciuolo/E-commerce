import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

interface Transaction {
  item: string;
  cost: number;
}

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

  // Nomi colonne della tabella degli acquisti
  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [];


  constructor(private UserService: UserService) {}

  ngOnInit() {
    let tmp_array: Transaction[] = [];
    /**
     * Ottengo l'id dal session storage
     */
    let sessionid = window.sessionStorage.getItem('id');

    this.user = this.UserService.getUserByID(sessionid).subscribe((result) => {
      this.user = result;
      document.getElementById('avatar')!.style.backgroundImage = `url(${this.user!.image})`;
      
      this.nome = this.user!.nome;
      this.cognome = this.user!.cognome;
      this.data_nascita = this.user!.data_nascita;
      this.username = this.user!.username;
      this.email = this.user!.email;
      this.user!.transactions.forEach((element: Transaction) => {
        tmp_array.push(element);
      });
      this.transactions = tmp_array;
    });
  }

  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }
}
