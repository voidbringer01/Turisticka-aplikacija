import { Pipe, PipeTransform } from '@angular/core';
import { Znamenitost } from '../models/znamenitost';

@Pipe({
  name: 'vaznostfilter'
})
export class VaznostfilterPipe implements PipeTransform {

  transform(items: Znamenitost[], filter: {vaznost:string}): any {
    if(!items || !filter)
      return items;
    
    return items.filter(item=>item.vaznost.indexOf(filter.vaznost)!==-1);
  }

}
