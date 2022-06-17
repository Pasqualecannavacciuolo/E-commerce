import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Questa libreria permette di creare ALERT personalizzati
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm!: FormGroup;
  
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    })

    //this.registerForm.valueChanges.subscribe(console.log)
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  onSubmit() {

    let user = {
      username : this.username?.value,
      email: this.email?.value
    };

    // Alert personalizzato che avvisa dell'avvenuta registrazione
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Ti sei registrato con successo',
      showConfirmButton: false,
      timer: 1500
    });

    setTimeout(() => {
      window.sessionStorage.setItem('username', user.username);
      window.sessionStorage.setItem('email', user.email);
      this.router.navigate(['/login']);
    }, 2000)


  }

}
