import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(array: any, field: string): any[] {
    array.sort((a: any, b: any) => {
      if (a[field].toLowerCase() < b[field].toLowerCase()) {
        return -1;
      } else if (a[field].toLowerCase() > b[field].toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}

/**
 * transform(array: Course[], field: string): any[] {
    array.sort(function(a: Course, b: Course){
      var nameA = a.titolo.toLowerCase(), nameB = b.titolo.toLowerCase();
      if (nameA < nameB) //sort string ascending
       return -1;
      if (nameA > nameB)
       return 1;
      return 0; //default return value (no sorting)
     });
    return array;
  }
 */