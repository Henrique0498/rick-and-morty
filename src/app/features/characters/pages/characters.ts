import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'characters-page',
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
})
export class CharactersPage {
  protected readonly title = signal('rick-and-morty');
  teste = 'Titulo';
  subtitle = 'A simple application to browse the Rick and Morty API';
}
