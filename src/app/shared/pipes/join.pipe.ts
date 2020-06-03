import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    if (!value) {
      return '';
    }
    return value.map((item: string) => item).join(' | ');
  }

}
