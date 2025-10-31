import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { selectUser } from '@core/store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectUser).pipe(
    take(1),
    map((user) => {
      if (user) {
        return true;
      }

      if (typeof window === 'undefined') {
        return true;
      }

      router.navigate(['/auth/login']);
      return false;
    })
  );
};
