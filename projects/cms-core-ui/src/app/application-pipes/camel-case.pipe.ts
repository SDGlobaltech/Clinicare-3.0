import { Pipe, PipeTransform } from '@angular/core';
import { TranslateParser, TranslatePipe } from '@ngx-translate/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe extends TranslatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // return null;
    const data = value;

    if (data) {
      return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();  
     } else {
  return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
       }  
    }
  
  // }

}
