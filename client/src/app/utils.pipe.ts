import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utils'
})
export class UtilsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
