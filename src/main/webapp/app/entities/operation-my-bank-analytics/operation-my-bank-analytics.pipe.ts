import { Pipe, PipeTransform } from '@angular/core';
import { OperationMyBankAnalytics } from './operation-my-bank-analytics.model';

@Pipe({
  name: 'operationFilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: OperationMyBankAnalytics[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;

searchText = searchText.toLowerCase();

return items.filter( it => {
		console.log("PIPE : Filter on " + it + " with " + searchText);
      return it.label.indexOf(searchText) != -10;
    });
   }
}
