import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, tap, map, exhaustMap } from 'rxjs';
import { AuthService, JwtDecoderService } from '@social-networking/services';
import { Router } from '@angular/router';
import { AuthResponseEntity } from './auth.models';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import * as fromShared from '@social-networking/shared-ui';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthEffects {
	private actions$ = inject(Actions);
	private authService = inject(AuthService);
	private router = inject(Router);
	private decoder = inject(JwtDecoderService);
	private store = inject(Store<fromShared.SharedState>);
	
	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.initLogin),
			exhaustMap(({ payload }) =>
				this.authService.loginUserAuthLoginPost({ body: payload })
				.pipe(
					map(user => {
						this.store.dispatch(fromShared.setIsLoading({ status: false }));
						this.store.dispatch(fromShared.setError({ error: undefined }));
						return AuthActions.loginSuccess({ payload: user as AuthResponseEntity });
					}),
					catchError((error: HttpErrorResponse) => {
						console.error(error);
						this.store.dispatch(fromShared.setIsLoading({ status: false }));
						let err: string;
						if (error.statusText === 'Unknown Error')
							err = 'An error occurred. Please try again';
						else err = error.error?.detail;
						return of(fromShared.setError({ error: err }));
					})
				)
			)
		)
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
						this.decoder.decodeToken(payload.access_token)?.exp;
					
					if (now > unixTimestamp) {
						this.store.dispatch(AuthActions.logoutSuccess());
					}
				})
			),
      { dispatch: false }
	);
	
	signup$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.initSignup),
			exhaustMap(({ payload }) =>
				this.authService.registerUserAuthRegisterPost({ body: payload })
				.pipe(
					map(() => {
						this.store.dispatch(fromShared.setIsLoading({ status: false }));
						return AuthActions.signupSuccess();
					}),
					catchError(error => {
						this.store.dispatch(fromShared.setIsLoading({ status: false }));
						let err: string;
						if (error.statusText === 'Unknown Error')
							err = 'An error occurred. Please try again';
						else err = error.error?.detail;
						return of(fromShared.setError({ error: err }));
					})
				)
			)
		)
	);
	
	signupSuccess$ = createEffect(() =>
      this.actions$.pipe(
         ofType(AuthActions.signupSuccess),
         tap(() => {
            this.router.navigate(['/login']).then();
         })
      ),
   { dispatch: false }
	);
	
	logoutSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(AuthActions.logoutSuccess),
				tap(() => {
					localStorage.removeItem('user');
					this.router.navigate(['/login']).then();
				})
			),
		{ dispatch: false }
	);
	
	autoLogin$ = createEffect(() =>
      this.actions$.pipe(
         ofType(AuthActions.initAutoLogin),
         tap(() => {
            const user: AuthResponseEntity | null =
               JSON.parse(localStorage.getItem('user') as string);
            
            if (user) {
               const now = new Date().getTime() / 1000;
               const unixTimestamp: number =
                  this.decoder.decodeToken(user.access_token)?.exp;
               
               if (now > unixTimestamp) {
                  this.store.dispatch(AuthActions.logoutSuccess());
               }
               this.store.dispatch(AuthActions.autoLoginSuccess({ payload: user }));
            }
         })
      ),
		{ dispatch: false }
	);
}
