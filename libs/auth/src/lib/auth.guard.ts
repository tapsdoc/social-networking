import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from './store/auth.reducer';
import { selectUser } from './store/auth.selectors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authGuard: CanActivateFn = (route, state) => {
   
   const router = inject(Router);
   const store = inject(Store<AuthState>)

   return store.select(selectUser)
      .pipe(
         take(1),
         map((user) => {
            if (user) {
               return true;
            }
            return router.createUrlTree(['/login']);
         })
      );
};
