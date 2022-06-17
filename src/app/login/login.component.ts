import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Questa libreria permette di creare ALERT personalizzati
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

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
    let user = {
      username: this.username?.value,
      email: this.email?.value,
    };

    /**
     * Ottengo le credenziali salvate
     * In futuro saranno ottenute dal backend
     */
    let sessionUsername = window.sessionStorage.getItem('username');
    let sessionEmail = window.sessionStorage.getItem('email');

    // Se le credenziali inserite corrispondo a quelle salvate allora accedi
    if (user.username === sessionUsername && user.email === sessionEmail) {
      window.sessionStorage.setItem('logged', 'true');
      // Alert personalizzato che avvisa dell'avvenuta registrazione
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login effettuato con successo',
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      }, 2000);
    }
  }
}
