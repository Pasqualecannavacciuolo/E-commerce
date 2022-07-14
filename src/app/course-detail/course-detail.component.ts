import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../models/Cart';
import { Course } from '../models/Course';
import { CartService } from '../services/cart.service';
import { CourseService } from '../services/course.service';
import { multi, lineChartcustomColors, popularity_data } from '../charts_data/data';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course: Course | undefined;
  cart?: Cart;
  // Array che contiene tutti i progetti di un corso
  progetti: any = [];

  // Variabili grafico
  multi!: any[];
  lineChartcustomColors!: any[];
  popularity_data!: any[];

  // Opzioni grafico
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Anno';
  yAxisLabel: string = 'Stars';
  xAxisLabel_popularity: string = 'Framework';
  yAxisLabel_popularity: string = 'Popolarita';
  timeline: boolean = true;

  constructor(private CartService: CartService, private CourseService: CourseService, private router: ActivatedRoute) { 
    Object.assign(this, { multi });
    Object.assign(this, { lineChartcustomColors });
    Object.assign(this, { popularity_data });
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const id = params['id'];
      if(id){
        this.CourseService.getCourseById(id).subscribe(course => {
          this.course = course;
          // Ottengo tutti i progetti relativi ad un corso
          this.course?.progetti.forEach(element => {
            this.progetti.push(element)
          });
        });
      }
    });
  }

  addToCart(course: Course) {
    // Se trovo un carrello con questo ID
    this.CartService.getCart(window.sessionStorage.getItem('id')).subscribe((res) => {
      if(res.hasOwnProperty('id')) {
        this.cart = res;
        let courses_array = this.cart?.items;
        let cart_obj = {
          id: window.sessionStorage.getItem('id'),
          items: courses_array
        }
        cart_obj.items?.push(course);
        this.CartService.addItem(window.sessionStorage.getItem('id'), <Cart>cart_obj).subscribe();
        window.location.reload();
      }
       
      }, (error) => { // Se non trovo alcun carrello con l'ID indicato
      let courses_array = [];
      courses_array.push(course);
      let cart_obj = {
        id: window.sessionStorage.getItem('id'),
        items: courses_array
      }
      this.CartService.saveToCart(<Cart>cart_obj).subscribe();
      window.location.reload();
    });
  }

}