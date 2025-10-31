import { Component, LOCALE_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header';
import { FooterComponent } from './shared/components/footer/footer';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { SidebarComponent } from '@shared/components/sidebar/sidebar';

registerLocaleData(ptBr);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './app.html',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class App {
  protected readonly title = signal('Rick and Morty');
}
