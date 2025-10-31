import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { selectUser } from '@core/store/auth/auth.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'profile-page',
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  imports: [CommonModule],
})
export class ProfilePage {
  private store = inject(Store);
  user$ = this.store.select(selectUser);
}
