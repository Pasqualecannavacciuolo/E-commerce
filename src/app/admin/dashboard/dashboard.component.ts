import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  actions = [
    'Crea Admin',
    'Crea Prodotto',
    'Modifica prodotto',
    'Cancella Prodotto',
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}


}
