import { Component, importProvidersFrom, LOCALE_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header';
import { FooterComponent } from './shared/components/footer/footer';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { appStore } from './app.store';
import { provideStore, StoreModule } from '@ngrx/store';
import { authReducer } from '@core/store/auth/auth.reducer';

registerLocaleData(ptBr);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class App {
  protected readonly title = signal('Rick and Morty');
}
