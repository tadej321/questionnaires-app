import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'row'
})
export class RowPipe implements PipeTransform {

  transform(input: any[], mod: number): any[][] {
    return input.reduce((previous, next, index) => {
      if (index % mod === 0) {
        previous.push([next]);
      } else {
        previous[previous.length - 1].push(next);
      }
      return previous;
    }, [] as any[][]);
  }
}
