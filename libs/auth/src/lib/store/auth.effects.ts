import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, tap, map, exhaustMap, mergeMap, EMPTY } from 'rxjs';
import * as AuthActions from './auth.actions';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AuthService, JwtDecoderService } from '@social-networking/services';
import { Router } from '@angular/router';
import { AuthResponseEntity } from './auth.models';
import { autoLoginSuccess, initAutoLogin, logoutSuccess } from './auth.actions';

@Injectable()
export class AuthEffects {
	private actions$ = inject(Actions);
	private authService = inject(AuthService);
	private router = inject(Router);
   private decoder = inject(JwtDecoderService);
   
   login$ = createEffect(() =>
      this.actions$.pipe(
         ofType(AuthActions.initLogin),
         mergeMap(({ payload }) =>
            this.authService.loginUserAuthLoginPost({ body: payload })
            .pipe(
               map(user =>
                  AuthActions.loginSuccess({ payload: user as AuthResponseEntity })),
               catchError(error => {
                  console.error(error)
                  return of(AuthActions.loadAuthFailure({ error }))
               })
            )
         )
      )
   );
   
   signup$ = createEffect(() =>
      this.actions$.pipe(
         ofType(AuthActions.initSignup),
         exhaustMap(({ payload }) =>
            this.authService.registerUserAuthRegisterPost({ body: payload })
            .pipe(
               map(() =>
                  AuthActions.signupSuccess()),
               catchError(error => {
                  console.error(error);
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
               localStorage.setItem('user', JSON.stringify(payload));
               this.router.navigate(['/posts']).then();
               const now = new Date().getTime() / 1000;
               const unixTimestamp: number =
                  this.decoder.decodeToken(payload.access_token)?.exp
               
               if (now > unixTimestamp) {
                  return of(logoutSuccess());
               }
               return EMPTY;
            }),
         ),
   );
   
   autoLogin$ = createEffect(
      () => {
         return this.actions$.pipe(
            ofType(initAutoLogin),
            map(() => {
              this.authService.autoLogin();
            })
         );
      },
      { dispatch: false }
   );
   
   // autoLogin$ = createEffect(() =>
   //    this.actions$.pipe(
   //       ofType(AuthActions.autoLoginSuccess),
   //       map(() => {
   //
   //          const user: AuthResponseEntity | null =
   //             JSON.parse(localStorage.getItem('user') as string);
   //
   //          if (user) {
   //             const now = new Date().getTime() / 1000;
   //             const unixTimestamp: number =
   //                this.decoder.decodeToken(user.access_token)?.exp;
   //
   //             if (now > unixTimestamp) {
   //                console.log(user);
   //                return (AuthActions.logoutSuccess());
   //             }
   //             console.log(user);
   //             return (AuthActions.autoLoginSuccess({ payload: user }));
   //          }
   //          console.log(user);
   //          return (AuthActions.logoutSuccess());
   //       }),
   //    )
   // );
   
   logoutSuccess$ = createEffect(
      () =>
         this.actions$.pipe(
            ofType(AuthActions.logoutSuccess),
            tap(() => {
               localStorage.removeItem('user');
              // this.router.navigate(['/login']).then()
            }),
         ),
      { dispatch: false }
   );
}
