import { createReducer, on, Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponseEntity } from './auth.models';
import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
	user: AuthResponseEntity | null;
	isLoading: boolean;
	error: HttpErrorResponse | null;
}

export interface AuthPartialState {
	readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialAuthState: AuthState = {
	user: null,
	error: null,
	isLoading: false,
};

const reducer = createReducer(
	initialAuthState,
	on(AuthActions.initLogin, AuthActions.initAutoLogin, AuthActions.initSignup, state => ({
		...state,
		isLoading: true
	})),
	on(AuthActions.loginSuccess, AuthActions.autoLoginSuccess, (state, { payload }) => {
		if (!state.user) {
			return {
				...state,
				user: payload,
				isLoading: false
			};
		}
		return state;
	}),
	on(AuthActions.signupSuccess, AuthActions.logoutSuccess, state => ({
		...state,
		isLoading: false,
		user: null
	})),
   on(AuthActions.loadAuthFailure, (state, { error }) => ({
      ...state,
      error,
      isLoading: false
   })),
	on(AuthActions.clearAuthError, (state) => ({
		...state,
		error: null
	}))
);

export function authReducer(state: AuthState | undefined, action: Action){
	return reducer(state, action);
}
