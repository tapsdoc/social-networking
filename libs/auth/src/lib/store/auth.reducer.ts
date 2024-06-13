import { createReducer, on, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { AuthResponse } from '@social-networking/services';
import { HttpErrorResponse } from '@angular/common/http';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
	user: AuthResponse | null;
	isLoading: boolean;
	error: HttpErrorResponse | null;
}

export interface AuthPartialState {
	readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialAuthState: AuthState = {
	// set initial required properties
	user: null,
	error: null,
	isLoading: false,
};

const reducer = createReducer(
	initialAuthState,
	on(AuthActions.LoginStart, state => ({
		...state,
		error: null,
		isLoading: true
	})),
	on(AuthActions.loginSuccess, (state, { payload }) => {
		if (!state.user) {
			return {
				...state,
				user: payload,
				error: null,
				isLoading: false
			};
		}
		return state;
	}),
	on(AuthActions.logoutSuccess, (state) => ({
		...state,
		user: null,
		isLoading: false
	})),
   on(AuthActions.loadAuthFailure, (state, { error }) => ({
      ...state,
      error,
      isLoading: false
   })),
);

export function authReducer(state: AuthState | undefined, action: Action) {
	return reducer(state, action);
}
