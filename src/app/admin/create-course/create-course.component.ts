import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/Course';
import { CourseService } from 'src/app/services/course.service';
// Questa libreria permette di creare ALERT personalizzati
import Swal from 'sweetalert2';
// Questa libreria genera ID univoci
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  createCourseForm!: FormGroup;

  constructor(private fb: FormBuilder, private CourseService: CourseService) { }

  ngOnInit(): void {
    this.createCourseForm = this.fb.group({
      titolo: ['', [Validators.required]],
      body_introduzione: ['', [Validators.required]],
      body_cosa_imparerai: ['', [Validators.required]],
      prezzo: ['', [Validators.required]],
      image: ['', [Validators.required]],
      macro_category: ['', [Validators.required]],
      tags: this.fb.array([], [Validators.required]),
      cosa_imparerai: this.fb.array([], [Validators.required]),
      progetti: this.fb.array([], [Validators.required]),
    });
  }

  get titolo() {
    return this.createCourseForm.get('titolo');
  }
  get body_introduzione() {
    return this.createCourseForm.get('body_introduzione');
  }
  get body_cosa_imparerai() {
    return this.createCourseForm.get('body_cosa_imparerai');
  }
  get prezzo() {
    return this.createCourseForm.get('prezzo');
  }
  get image() {
    return this.createCourseForm.get('image');
  }
  get macro_category() {
    return this.createCourseForm.get('macro_category');
  }
  get tags() {
    return this.createCourseForm.get('tags') as FormArray;
  }
  get cosa_imparerai() {
    return this.createCourseForm.get('cosa_imparerai') as FormArray;
  }
  get progetti() {
    return this.createCourseForm.get('progetti') as FormArray;
  }


  // Metodi per aggiungere - rimuovere form per un TAG
  newTag(): FormGroup {  
    return this.fb.group({  
      name: ['', [Validators.required]]
    })  
  }  
     
  addTag() {  
    this.tags.push(this.newTag());  
  }  
     
  removeTag(i:number) {  
    this.tags.removeAt(i);  
  }
  
  // Metodi per aggiungere - rimuovere form per un'argomento nella sezione cosa imparerai
  newCosaImparerai(): FormGroup {  
    return this.fb.group({  
      name: ['', [Validators.required]]
    })  
  }  
     
  addCosaImparerai() {  
    this.cosa_imparerai.push(this.newCosaImparerai());  
  }  
     
  removeCosaImparerai(i:number) {  
    this.cosa_imparerai.removeAt(i);  
  }

  // Metodi per aggiungere - rimuovere form per un progetto nella sezione dei progetti
  newProgetto(): FormGroup {  
    return this.fb.group({  
      nome: ['', [Validators.required]],
      difficolta: ['', [Validators.required]]
    })  
  }  
     
  addProgetto() {  
    this.progetti.push(this.newProgetto());  
  }  
     
  removeProgetto(i:number) {  
    this.progetti.removeAt(i);  
  }


  convertToArray(obj: FormArray) {
    let array = [];
    for(let i=0; i<obj.value.length; i++) {
      array.push(obj.value[i]['name']);
    }
    return array;
  }
  
  onSubmit() {

    let data_from_form = {
      id: uuidv4(),
      titolo: this.titolo!.value,
      body_introduzione: this.body_introduzione!.value,
      body_cosa_imparerai: this.body_cosa_imparerai!.value,
      prezzo: <number>this.prezzo!.value,
      image: this.image!.value,
      macro_category: this.macro_category!.value,
      tags: this.convertToArray(this.tags),
      cosa_imparerai: this.convertToArray(this.cosa_imparerai),
      progetti: this.progetti!.value,
    };

    console.log(data_from_form);


    this.CourseService.createCourse(<Course><unknown>data_from_form).subscribe();

    // Alert personalizzato che avvisa dell'avvenuta creazione
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Corso creato con successo',
      showConfirmButton: false,
      timer: 1500,
    });
    
  }

}
