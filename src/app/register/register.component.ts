import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

// Questa libreria permette di creare ALERT personalizzati
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { User } from '../models/User';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user?: User;
  
  registerForm!: FormGroup;
  datiAnagraficiForm!: FormGroup;

  isLinear = false;
  stepperOrientation: Observable<StepperOrientation>;
  
  constructor(private fb: FormBuilder, breakpointObserver: BreakpointObserver, private router: Router, private UserService: UserService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {

    this.datiAnagraficiForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      data_nascita: ['', Validators.required]
    });


    this.registerForm = this.fb.group({
      username: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    });

    //this.registerForm.valueChanges.subscribe(console.log)
  }

  get nome() {
    return this.datiAnagraficiForm.get('nome');
  }
  
  get cognome() {
    return this.datiAnagraficiForm.get('cognome');
  }

  get data_nascita() {
    return this.datiAnagraficiForm.get('data_nascita');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  onSubmit() {

    this.user = {
      id: uuidv4(),
      nome: this.nome?.value,
      cognome: this.cognome?.value,
      data_nascita: this.data_nascita?.value,
      username : this.username?.value,
      email: this.email?.value
    };

    // Alert personalizzato che avvisa dell'avvenuta registrazione
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Ti sei registrato con successo',
      showConfirmButton: false,
      timer: 1500
    });

    
    this.UserService.saveUser(this.user!).subscribe(u => this.user = u);      

    setTimeout(() => {
      window.sessionStorage.setItem('id',this.user!.id);
      this.router.navigate(['/login']);
    }, 2000)


  }

}
