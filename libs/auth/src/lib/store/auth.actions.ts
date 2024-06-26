import { createAction, props } from '@ngrx/store';
import { AuthResponseEntity, LoginEntity, SignupEntity } from './auth.models';

export const initLogin = createAction(
	'[Auth] Init Login',
	props<{ payload: LoginEntity }>()
);

export const initSignup = createAction(
	'[Auth] Init Signup',
	props<{ payload: SignupEntity }>()
);

export const initAutoLogin = createAction('[Auth] Init Auto Login');

export const signupSuccess = createAction('[Auth] Signup Success');

export const loginSuccess = createAction(
	'[Auth] Login Success',
	props<{ payload: AuthResponseEntity }>()
);

export const autoLoginSuccess = createAction(
	'[Auth] Auto Login Success',
	props<{ payload: AuthResponseEntity }>()
);

export const logoutSuccess = createAction('[Auth] Logout');

export const loadAuthFailure = '[Auth] Error';