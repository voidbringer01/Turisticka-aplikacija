import { Pipe, PipeTransform } from '@angular/core';
import { Vaznost } from '../models/vaznost';
import { Znamenitost } from '../models/znamenitost';

@Pipe({
  name: 'vaznostfilter'
})
export class VaznostfilterPipe implements PipeTransform {

  transform(items: Znamenitost[], filter: {vaznost:Vaznost}): any {
    if(!items || !filter)
      return items;
    return items.filter(item=>item.vaznost==filter.vaznost);
  }

}
