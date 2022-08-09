import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

//Import che servono per la paginazione della tabella
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

// Importing Color scheme for cards cahrt
import { cardsChartColorScheme } from '../../charts_data/data'

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
  // For the angular material table
  displayedColumns: string[] = ['titolo_corso', 'numero_acquisti'];
  ELEMENT_DATA: Acquisti[] = [];
  dataSource: any;
  totale_acquisti: any[] = [];
  tmp_array: any[] = [];

  // For the cards chart
  single: any[] = [];
  number_of_users = 0
  number_of_admins = 0
  numero_totale_acquisti = 0
  fatturato_totale = 0
  cardsChartColorScheme!: any[]
  cardColor: string = '#232837';

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  
  
  constructor(
    private UserService: UserService,
    private CoursesService : CourseService
    ) {
      Object.assign(this, { cardsChartColorScheme })
      Object.assign(this.single)
    }

  ngOnInit(): void {
    this.getAllTransactions();
    this.createElementData();
    this.getCardsStats()
    setTimeout(() => {
      this.ELEMENT_DATA = this.tmp_array;
      this.dataSource = new MatTableDataSource<Acquisti>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data)
    }, 800);
  }

  getCardsStats() {
    // Getting NON ADMIN users
    let not_admin_users = []
    this.UserService.getAllUsers().subscribe(res => {
      res.forEach(user => {
        if (user.role == undefined) {
          not_admin_users.push(user)
        }
      });
      let tmp = {
        name: 'Numero utenti',
        value: not_admin_users.length
      };
      this.single.push(tmp);
      this.single = [...this.single];
    });
    // Getting ADMIN users
    let admin_users = []
    this.UserService.getAllUsers().subscribe(res => {
      res.forEach(user => {
        if (user.role == 'Admin') {
          admin_users.push(user)
        }
      });
      let tmp = {
        name: 'Numero admin',
        value: admin_users.length
      };
      this.single.push(tmp);
      this.single = [...this.single];
    });
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
      // This data is for the cards chart in hoempage of the admin dashboard
      this.totale_acquisti.forEach(element => {
        element.forEach((transazione: any) => {
          this.fatturato_totale = this.fatturato_totale + transazione.cost
        });
        this.numero_totale_acquisti += element.length
      });
      // Getting total purchases
      
      let tmp_1 = {
        name: 'Totale acquisti',
        value: this.numero_totale_acquisti
      }
      this.single.push(tmp_1);
      this.single = [...this.single];

      let tmp_2 = {
        name: 'Fatturato totale',
        value: this.fatturato_totale
      }
      this.single.push(tmp_2);
      this.single = [...this.single];
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
