import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleizePipe'
})
export class TitleizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return null
    }

    return value.split('_')
        .map(w => w.charAt(0).toUpperCase() + w.substring(1).toLowerCase())
        .join(' ');
  }

}
