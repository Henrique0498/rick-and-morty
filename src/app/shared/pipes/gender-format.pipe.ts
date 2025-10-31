import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'genderFormat', standalone: true })
export class GenderFormatPipe implements PipeTransform {
  transform(value: string): string {
    switch (value.toLowerCase()) {
      case 'male':
        return 'Masculino';
      case 'female':
        return 'Feminino';
      default:
        return 'Desconhecido';
    }
  }
}
