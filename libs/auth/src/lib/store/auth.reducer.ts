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
	on(AuthActions.initLogin, state => ({
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
	on(AuthActions.initSignup, state => ({
		...state,
		error: null,
		isLoading: true
	})),
	on(AuthActions.signupSuccess, (state) => ({
		...state,
		user: null,
		isLoading: false
	})),
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

export function authReducer(state: AuthState | undefined, action: Action){
	return reducer(state, action);
}
