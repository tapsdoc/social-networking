import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from './store/auth.reducer';

export const authGuard: CanActivateFn = (route, state) => {
   
   const router = inject(Router);
   const store = inject(Store<AuthState>)

   return store.select('auth').pipe(
      take(1),
      map(state => {
         return state.user
      }),
      map((user) => {
         if (user) {
            return true;
         }
         return router.createUrlTree(['/login']);
      })
   );
};
