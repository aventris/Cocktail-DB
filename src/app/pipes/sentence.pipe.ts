import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentence',
})
export class SentencePipe implements PipeTransform {
  transform(string: string): string {
    if (string) return string[0].toUpperCase() + string.slice(1).toLowerCase();
    return 'null';
  }
}
