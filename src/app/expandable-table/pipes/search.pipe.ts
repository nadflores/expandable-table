import { Pipe, PipeTransform } from '@angular/core';
import { ETable } from "src/app/expandable-table/expandable-table.component";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: ETable[], term: string): ETable[] {
    if(term) {
      return value.filter(val => val.randomNumber.includes(term) || val.date.toLowerCase().includes(term));
    }
    else {
      return value;
    }
  }

}
