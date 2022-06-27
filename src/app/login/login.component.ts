import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Questa libreria permette di creare ALERT personalizzati
import Swal from 'sweetalert2';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  arrayOfUsers: User[] = [];
  user?: User;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private UserService: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get email() {
    return this.loginForm.get('email');
  }

  onSubmit() {
    let user_form_data = {
      username: this.username!.value,
      email: this.email!.value,
    };

    //this.UserService.getUserByID(sessionid).subscribe(u => this.user = u);
    this.UserService.getAllUsers().subscribe((data) =>
      data.forEach((element) => {
        this.arrayOfUsers.push(element);
      })
    );
      
      let flag = 0;
      let array_size = this.arrayOfUsers.length;
      let founded_user_id = 0;

      for (let i = 0; i < array_size; i++) {
        if ( this.arrayOfUsers[i].username == user_form_data.username && this.arrayOfUsers[i].email == user_form_data.email) {
          flag = 1;
          founded_user_id = this.arrayOfUsers[i].id;
        }
      }

      if(flag==1) {
        window.sessionStorage.setItem('logged', 'true');
        window.sessionStorage.setItem('id', String(founded_user_id));
      // Alert personalizzato che avvisa dell'avvenuta registrazione
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login effettuato con successo',
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      }, 2000);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Qualcosa è andato storto nella fase di Login',
          showConfirmButton: false,
          timer: 1500,
        });
      }
  }
}
