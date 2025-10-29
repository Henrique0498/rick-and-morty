import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { selectUser } from '@core/store/auth/auth.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'component-header',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private store = inject(Store);
  router = inject(Router);
  user$ = this.store.select(selectUser);

  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  logout() {
    this.store.dispatch({ type: '[Auth] Logout' });
    this.router.navigate(['/auth/login']);
  }
}
