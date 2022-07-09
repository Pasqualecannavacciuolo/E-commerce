import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../models/Cart';
import { Course } from '../models/Course';
import { CartService } from '../services/cart.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course: Course | undefined;
  cart?: Cart;

  constructor(private CartService: CartService, private CourseService: CourseService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const id = params['id'];
      if(id){
        this.CourseService.getCourseById(id).subscribe(course => this.course = course);
      }
    });
  }

  addToCart(course: Course) {
    this.CartService.getCart(window.sessionStorage.getItem('id')).subscribe((res) => {
      if(res.hasOwnProperty('id')) {
        this.cart = res;
        let courses_array = this.cart?.items;
        let cart_obj = {
          id: window.sessionStorage.getItem('id'),
          items: courses_array
        }
        console.log("Prima:  " + cart_obj.items);
        cart_obj.items?.push(course);
        console.log("Dopo:  " + cart_obj.items);
        this.CartService.addItem(window.sessionStorage.getItem('id'), <Cart>cart_obj).subscribe();
        window.location.reload();
      }
       
      }, (error) => { // Se non trovo alcun carrello con l'ID indicato
      // Se trovo un carrello con questo ID
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
    /*let courses_array = [];
    courses_array.push(course);
    let cart_obj = {
      id: window.sessionStorage.getItem('id'),
      items: courses_array
    }
    this.CartService.saveToCart(<Cart>cart_obj).subscribe((res) => {
      this.cart = res;
      if(this.cart?.items.length! > 0) {
        console.log("Sono maggiore di 0");
      } else {
        console.log("Sono vuoto");
      }
    });
  }*/

}
