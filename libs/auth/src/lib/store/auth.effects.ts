import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, tap, map, switchMap } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthService, JwtDecoderService } from '@social-networking/services';
import { Router } from '@angular/router';
import { AuthResponseEntity } from './auth.models';
import { logoutSuccess } from './auth.actions';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.reducer';

@Injectable()
export class AuthEffects {
	private actions$ = inject(Actions);
	private authService = inject(AuthService);
	private router = inject(Router);
   private decoder = inject(JwtDecoderService);
   private store = inject(Store<AuthState>);
   
   login$ = createEffect(() =>
      this.actions$.pipe(
         ofType(AuthActions.initLogin),
         switchMap(({ payload }) =>
            this.authService.loginUserAuthLoginPost({ body: payload })
            .pipe(
               tap(res => {
                  const { access_token } = res as AuthResponseEntity;
                  
                  const now = new Date().getTime() / 1000;
                  const unixTimestamp: number = this.decoder.decodeToken(access_token)?.exp
                  if (now > unixTimestamp) {
                     this.authService.logout();
                     return;
                  }
               }),
               map(user =>
                  AuthActions.loginSuccess({ payload: user as AuthResponseEntity })),
               catchError(error => {
                  return of(AuthActions.loadAuthFailure({ error }))
               })
            )
         )
      )
   );
   
   signup$ = createEffect(() =>
      this.actions$.pipe(
         ofType(AuthActions.initSignup),
         switchMap(({ payload }) =>
            this.authService.registerUserAuthRegisterPost({ body: payload })
            .pipe(
               map(() =>
                  AuthActions.signupSuccess()),
               catchError(error => {
                  return of(AuthActions.loadAuthFailure({ error }))
               })
            )
         )
      )
   );
   
   signupSuccess = createEffect(() =>
      this.actions$.pipe(
         ofType(AuthActions.signupSuccess),
         tap(() => {
            this.router.navigate(['/login']).then();
         })
      ),
      { dispatch: false }
   );
   
   loginSuccess$ = createEffect(
      () =>
         this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap(({ payload }) => {
               this.router.navigate(['/posts']).then();
               localStorage.setItem('user', JSON.stringify(payload));
            }),
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
            }),
         ),
      { dispatch: false }
   );
}
