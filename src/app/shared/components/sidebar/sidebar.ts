import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { heroHome, heroUsers, heroMapPin, heroPlay, heroBars3 } from '@ng-icons/heroicons/outline';
import { SidebarService } from '@shared/services/sidebar.service';
import { selectUser } from '@core/store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'component-sidebar',
  imports: [RouterLink, RouterLinkActive, NgIcon, AsyncPipe],
  providers: [provideIcons({ heroHome, heroUsers, heroMapPin, heroPlay, heroBars3 })],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  private store = inject(Store);
  private sidebar = inject(SidebarService);
  router = inject(Router);
  user$ = this.store.select(selectUser);

  isMenuOpen() {
    return this.sidebar.menuOpen();
  }

  logout() {
    this.store.dispatch({ type: '[Auth] Logout' });
    this.router.navigate(['/auth/login']);
  }
}
