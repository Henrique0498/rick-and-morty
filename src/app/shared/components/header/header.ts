import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../button/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'component-header',
  imports: [ButtonComponent, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  protected readonly title = signal('rick-and-morty');
  teste = 'Titulo';
  subtitle = 'A simple application to browse the Rick and Morty API';
}
