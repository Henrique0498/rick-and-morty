import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import * as AuthActions from '@core/store/auth/auth.actions';

export interface User {
  id: number;
  name: string;
  email: string;
  birthDate: string;
  avatar: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private store = inject(Store);
  private router = inject(Router);
  private users: User[] = [
    {
      id: 1,
      name: 'Henrique',
      email: 'henrique@example.com',
      birthDate: '1990-01-01',
      avatar: 'https://avatars.githubusercontent.com/u/39716479?v=4',
      password: '1234',
    },
  ];

  login(email: string, password: string) {
    return of(this.users).pipe(
      delay(1000),
      map((users) => {
        const user = users.find((user) => user.email === email && user.password === password);

        if (!user) {
          throw new Error('Credenciais inválidas');
        }

        return { user, token: 'mock-token-123' };
      })
    );
  }

  register(payload: {
    name: string;
    email: string;
    password: string;
    birthDate: string;
    avatar?: string;
  }) {
    return of(null).pipe(
      delay(1000),
      map(() => {
        const exists = this.users.some((u) => u.email === payload.email);
        if (exists) {
          throw new Error('E-mail já cadastrado');
        }

        const newUser: User = {
          id: this.users.length ? Math.max(...this.users.map((u) => u.id)) + 1 : 1,
          name: payload.name,
          email: payload.email,
          birthDate: payload.birthDate,
          password: payload.password,
          avatar: payload.avatar || 'https://i.pravatar.cc/300?img=24',
        };

        this.users.push(newUser);

        return { user: newUser, token: 'mock-token-123' };
      })
    );
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/auth/login']);
  }
}
