import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

//Import che servono per la paginazione della tabella
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface Acquisti {
  titolo_corso: string;
  numero_acquisti: number;
}

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {
  displayedColumns: string[] = ['titolo_corso', 'numero_acquisti'];
  
  ELEMENT_DATA: Acquisti[] = [];
  dataSource: any;
  totale_acquisti: any[] = [];
  tmp_array: any[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  
  
  constructor(
    private UserService: UserService,
    private CoursesService : CourseService
    ) {}

  ngOnInit(): void {
    this.getAllTransactions();
    this.createElementData();
    setTimeout(() => {
      this.ELEMENT_DATA = this.tmp_array;
      this.dataSource = new MatTableDataSource<Acquisti>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data)
    }, 800);
  }

  getAllTransactions() {
    // Ottengo come risposta tutti gli utenti dal database
    this.UserService.getAllUsers().subscribe(res => {
      // Per ogni utente mi interessano le sue transazioni SE CI SONO
      res.forEach(element => {
        if(element.transactions != undefined) { // Controllo se ci sono transazioni da trasferire nell'array TOTALE_ACQUISTI
          this.totale_acquisti.push(element.transactions)
        }
      });
    });
  }

  createElementData() {
    let titoli_corsi: string[] = []
    /** 
     ** Ottengo tutti i corsi dall'api mi servirà per salvare tutti i titoli per poterli poi ricercare tra gli acquisti
     ** e determinare la loro numero d'acquisto
     **/ 
    this.CoursesService.getAllCourses().subscribe(res => {
      res.forEach(element => {
        titoli_corsi.push(element.titolo);
      });
      titoli_corsi.forEach(titolo => {
        let cont = 0;
        this.totale_acquisti.forEach(acquisto => {
          acquisto.forEach((element: { item: any; }) => {
            if(titolo === element.item) {
              cont ++;
              //console.log("** UGUALI **")
            }
          });
        });
        let tmp_obj: Acquisti = {
          titolo_corso: '',
          numero_acquisti: 0
        };
        tmp_obj.titolo_corso = titolo;
        tmp_obj.numero_acquisti = cont;
        this.tmp_array.push(tmp_obj);
        //console.log(titolo + " - " + cont)
      });
    });
    
  }
}
