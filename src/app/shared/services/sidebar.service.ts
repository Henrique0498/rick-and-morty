import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  readonly menuOpen = signal(false);

  toggle() {
    this.menuOpen.update((v) => !v);
  }

  open() {
    this.menuOpen.set(true);
  }

  close() {
    this.menuOpen.set(false);
  }
}
