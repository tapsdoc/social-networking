import { createReducer, on, Action } from '@ngrx/store';
import { AuthResponseEntity } from './auth.models';
import * as AuthActions from './auth.actions';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { setIsLoading } from '@social-networking/shared-ui';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
	user: AuthResponseEntity | null;
}

export interface AuthPartialState {
	readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialAuthState: AuthState = {
	user: null,
};

const reducer = createReducer(
	initialAuthState,
	on(
		AuthActions.loginSuccess, AuthActions.autoLoginSuccess,
		(state, { payload }) => {
		if (payload) {
			return {
				...state,
				user: payload,
			};
		} else {
			return state;
		}
	}),
	on(AuthActions.logoutSuccess, state => ({
		...state,
		user: null
	})),
	on(setIsLoading, (state, { status }) => {
		return {
			...state,
			isLoading: status,
		};
	}),
);

export function authReducer(state: AuthState | undefined, action: Action) {
	return reducer(state, action);
}
