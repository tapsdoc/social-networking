import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, mergeMap } from 'rxjs';
import * as UsersActions from './users.actions';
import { HttpErrorResponse } from '@angular/common/http';
import * as fromShared from '@social-networking/shared-ui';
import { Store } from '@ngrx/store';
import { SharedState } from '@social-networking/shared-ui';
import { UsersService } from '@social-networking/services';

@Injectable()
export class UsersEffects {
	
	private actions$ = inject(Actions);
	private store = inject(Store<SharedState>);
	private userService = inject(UsersService);
	
	loadUsers$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UsersActions.initUsers),
			switchMap(() =>
            this.userService.getAllUsersUsersGet()
               .pipe(
                  map((users) => {
							this.store.dispatch(fromShared.setIsLoading({ status: false }));
							this.store.dispatch(fromShared.setError({ error: undefined }));
							return UsersActions.loadUsersSuccess({ users: users })
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
			),
		)
	);
	
	getUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UsersActions.initGetUser),
			switchMap(({ username }) =>
				this.userService.getUserUsersUsernameGet({ username: username })
				.pipe(
					map((user) => {
						this.store.dispatch(fromShared.setIsLoading({ status: false }));
						this.store.dispatch(fromShared.setError({ error: undefined }));
						return UsersActions.getUserSuccess({ user: user })
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
	
	deleteUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UsersActions.initDeleteUser),
			mergeMap(({ username }) =>
				this.userService.deleteUserUsersUsernameDelete({ username: username })
				.pipe(
					map(() => {
						this.store.dispatch(fromShared.setIsLoading({ status: false }));
						this.store.dispatch(fromShared.setError({ error: undefined }));
						return UsersActions.deleteUserSuccess();
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
}
