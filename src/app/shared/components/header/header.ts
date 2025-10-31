import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { selectUser } from '@core/store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBars3 } from '@ng-icons/heroicons/outline';
import { SidebarService } from '@shared/services/sidebar.service';
import { AuthService } from '@core/services/auth.service';

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
  private auth = inject(AuthService);
  user$ = this.store.select(selectUser);

  logout() {
    this.auth.logout();
  }

  toggleMenu() {
    this.sidebar.toggle();
  }
}
