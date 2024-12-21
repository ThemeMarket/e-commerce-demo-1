import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCategory',
})
export class FormatCategoryPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .split('-')
      .reduce((acc: string, val: string) => acc + ' ' + val, '');
  }
}
