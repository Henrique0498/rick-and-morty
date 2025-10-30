import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  isMenuOpen() {
    return this.sidebar.menuOpen();
  }

  logout() {
    this.closeMenuIfMobile();
    this.store.dispatch({ type: '[Auth] Logout' });
    this.router.navigate(['/auth/login']);
  }

  closeMenuIfMobile() {
    if (this.isBrowser && window.innerWidth < 768) {
      this.sidebar.close();
    }
  }
}
