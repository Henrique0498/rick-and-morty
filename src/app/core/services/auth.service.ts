import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  birthDate: string;
  avatar: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = [
    {
      id: 1,
      name: 'Henrique',
      email: 'henrique@example.com',
      birthDate: '1990-01-01',
      avatar: 'https://avatars.githubusercontent.com/u/39716479?v=4',
    },
  ];

  login(email: string, password: string) {
    return of(this.users).pipe(
      delay(1000),
      map((users) => {
        const user = users.find((u) => u.email === email);
        if (!user) throw new Error('Usuário não encontrado');
        return { user, token: 'mock-token-123' };
      })
    );
  }
}
