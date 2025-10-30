import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotFoundComponent } from '@shared/components/notFound/not-found';

@Component({
  selector: 'notfound-page',
  templateUrl: './notfound.html',
  styleUrl: './notfound.scss',
  imports: [NotFoundComponent],
})
export class NotFoundPage {
  protected readonly title = signal('rick-and-morty');
  teste = 'Titulo';
  subtitle = 'A simple application to browse the Rick and Morty API';
}
