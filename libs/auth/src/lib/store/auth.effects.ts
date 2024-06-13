import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, tap, map, switchMap } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthResponse, AuthService, JwtDecoderService } from '@social-networking/services';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
	private actions$ = inject(Actions);
	private authService = inject(AuthService);
	private router = inject(Router);
   private decoder = inject(JwtDecoderService);
   
   login$ = createEffect(() =>
      this.actions$.pipe(
         ofType(AuthActions.LoginStart),
         switchMap(({ payload }) =>
            this.authService.loginUserAuthLoginPost({ body: payload })
            .pipe(
               tap(res => {
                  this.router.navigate(['/posts']).then();
                  localStorage.setItem('user', JSON.stringify(res));
                  
                  const { access_token } = res as AuthResponse;
                  
                  const now = new Date().getTime() / 1000;
                  const unixTimestamp: number = this.decoder.decodeToken(access_token)?.exp
                  if (now > unixTimestamp) {
                     this.authService.logout();
                     return;
                  }
                  
                  // this.store.dispatch(loginSuccess({ payload: res.body as AuthResponse }));
               }),
               map(user =>
                  AuthActions.loginSuccess({ payload: user as AuthResponse })),
               catchError(error => {
                  // console.log(error);
                  return of(AuthActions.loadAuthFailure({ error }))
               })
            )
         )
      )
   );
   
   loginSuccess$ = createEffect(
      () =>
         this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap(() =>
               this.router.navigate(['/posts']))
         ),
      { dispatch: false }
   );
   
   logoutSuccess$ = createEffect(
      () =>
         this.actions$.pipe(
            ofType(AuthActions.logoutSuccess),
            tap(() => {
               localStorage.removeItem('user');
               this.router.navigate(['/login']).then()
            })
         ),
      { dispatch: false }
   );
}
