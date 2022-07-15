import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  actions = ['Crea Admin', 'Crea Prodotto', "Modifica prodotto", "Cancella Prodotto"]

  constructor() { }
  
  ngOnInit(): void {
  }


}
