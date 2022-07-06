import { Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from '../models/Course';
import { CourseService } from '../services/course.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { OrderByPipe } from '../order-by.pipe';
import { Subscription } from 'rxjs';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: any[];
}

let TREE_DATA: FoodNode[] = [];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit, OnDestroy {

  private subscription: Subscription | undefined;
  
  // Salvo tutti i corsi
  courses: Course[] = [];
  // Salvo tutte le macro categorie
  macro_categories = new Set();

  // Salvo tutti i tag
  api_tags: string[] = [];
  // Contiene tutti i tag ottenuti in modo univoco
  unique_tags: any;

  // Salvo la query di ricerca della barra di ricerca
  data: string = '';
  // Salvo il tag cliccato nel menu di filtraggio dei contenuti
  tag_filtering: string = '';

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private CourseService: CourseService, private order: OrderByPipe) {}
  

  ngOnInit(): void {
    // Ottengo tutti i corsi dall'API
    if(this.courses.length == 0) {
    this.subscription = this.CourseService.getAllCourses().subscribe(
      (res) => (
        (this.courses = res),
        // Ordino tutti i corsi in base al titolo con la pipe personalizzata
        this.order.transform(this.courses, 'titolo'),
        // Ottengo i tag di tutti i corsi dal'API
        this.courses.forEach((course) => {
          this.macro_categories.add(course.macro_category);
          for (let i = 0; i < course.tags.length; i++) {
            this.api_tags.push(course.tags[i]);
          }
        }),
        // Rimuovo i duplicati
        (this.unique_tags = [...new Set(this.api_tags)]),
        // Filtro i contenuti e li suddivido nelle macro categorie
        this.macro_categories.forEach((macro_category) => {
          let tmp_obj = {
            name: '',
            children: [],
          }
          this.courses.forEach((course) => {
              tmp_obj.name = <string>macro_category;
              if (course.macro_category === macro_category) {
                let obj_category_children = {
                  name: course.titolo
                }
                tmp_obj.children?.push(<never>obj_category_children);
                // Ordino tutti i corsi con la pipe personalizzata
                this.order.transform(tmp_obj.children, 'name')
              }
            
          });
         
            TREE_DATA.push(tmp_obj);
            this.dataSource.data = TREE_DATA;
            console.log(TREE_DATA);
          
          
        })
      )
    );
    }
  }

  setTag(tag: any) {
    this.tag_filtering = tag;
  }

  resetFilters() {
    this.tag_filtering = '';
    this.data = '';
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    TREE_DATA = [];
  }
}
