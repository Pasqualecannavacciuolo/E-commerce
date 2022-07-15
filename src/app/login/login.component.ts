import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';

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
    let founded_user_id = 0;
    let user_role = '';
    this.UserService.getAllUsers().subscribe((result) => {
      const user = result.find((element: any) => {
        founded_user_id = element.id;
        user_role = element.role;
        return (
          element.username === user_form_data.username &&
          element.email === user_form_data.email
        );
      });
      if (user) {
        window.sessionStorage.setItem('logged', 'true');
        window.sessionStorage.setItem('id', String(founded_user_id));
        // Se l'utente che sta loggando ha come ruolo ADMIN scrivo il token
        if(user_role === 'Admin') {
          window.sessionStorage.setItem('admin_token', 'b172t6f2tr12r9t119');
        }
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
    });
  }
}
