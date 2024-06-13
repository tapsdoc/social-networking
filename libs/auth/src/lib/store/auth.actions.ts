import { createAction, props } from '@ngrx/store';
import { LoginEntity } from './auth.models';
import { AuthResponse } from '@social-networking/services';
import { HttpErrorResponse } from '@angular/common/http';

export const LoginStart = createAction(
	'[Auth] Login Start',
	props<{ payload: LoginEntity }>()
)

export const loginSuccess = createAction(
	'[Auth] Login Success',
	props<{ payload: AuthResponse }>()
);

export const logoutSuccess = createAction('[Auth] Logout');

export const loadAuthFailure = createAction(
  '[Auth] Load Auth Failure',
  props<{ error: HttpErrorResponse }>()
);
