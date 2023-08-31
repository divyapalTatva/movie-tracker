import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    
  return value.length<=207 ?  value:  value.substring(1,204)+'...'
  }

}
