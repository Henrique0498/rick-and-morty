import { Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { heroHome, heroUsers, heroMapPin, heroPlay, heroBars3 } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'component-sidebar',
  imports: [RouterLink, RouterLinkActive, NgIcon],
  providers: [provideIcons({ heroHome, heroUsers, heroMapPin, heroPlay, heroBars3 })],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }
}
