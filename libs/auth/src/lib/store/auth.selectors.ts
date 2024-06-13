import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthState } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const selectAuthState =
  createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);


export const selectLoginSuccess = createSelector(
	selectAuthState,
	(state) => state.user
);

export const selectLogoutSuccess = createSelector(
	selectAuthState,
	(state) => null
);

export const selectIsLoading = createSelector(
	selectAuthState,
	(state) => state.isLoading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);


