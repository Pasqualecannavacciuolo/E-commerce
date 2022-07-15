import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css'],
})
export class CreateAdminComponent implements OnInit {
  user?: User;

  registerForm!: FormGroup;
  datiAnagraficiForm!: FormGroup;

  isLinear = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private UserService: UserService
  ) {}

  ngOnInit(): void {
    this.datiAnagraficiForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      data_nascita: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
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
      username: this.username?.value,
      email: this.email?.value,
      image: 'assets/fake_avatar.png',
      role: 'Admin'
    };

    // Alert personalizzato che avvisa dell'avvenuta registrazione
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Ti sei registrato con successo',
      showConfirmButton: false,
      timer: 1500,
    });

    this.UserService.saveUser(this.user!).subscribe((u) => (this.user = u));
  }
}
