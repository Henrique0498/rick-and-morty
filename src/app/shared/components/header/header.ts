import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { selectUser } from '@core/store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBars3 } from '@ng-icons/heroicons/outline';
import { SidebarService } from '@shared/services/sidebar.service';

@Component({
  selector: 'component-header',
  imports: [RouterLink, AsyncPipe, NgIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  providers: [provideIcons({ heroBars3 })],
})
export class HeaderComponent {
  private store = inject(Store);
  private sidebar = inject(SidebarService);
  router = inject(Router);
  user$ = this.store.select(selectUser);

  logout() {
    this.store.dispatch({ type: '[Auth] Logout' });
    this.router.navigate(['/auth/login']);
  }

  toggleMenu() {
    this.sidebar.toggle();
  }
}
