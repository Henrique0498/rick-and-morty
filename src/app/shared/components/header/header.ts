import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  user$ = this.store.select(selectUser);
}
