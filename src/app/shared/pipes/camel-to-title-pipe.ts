import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelToTitle',
})
export class CamelToTitlePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Split the camelCase string into words
    const words = value.split(/(?=[A-Z])/);

    // Capitalize first letter of each word and join with spaces
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
