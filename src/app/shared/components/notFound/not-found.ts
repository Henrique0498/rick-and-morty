import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'component-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFoundComponent {
  @Input() title = 'Página Não Encontrada';
}
