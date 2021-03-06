import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  logged: string = 'false';

  constructor() { }

  ngOnInit(): void {
    if(window.sessionStorage.getItem('logged') === 'true') {
      this.logged = 'true';
    }
  }

}
