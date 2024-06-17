import { createAction, props } from '@ngrx/store';

export const SET_LOADING_ACTION = '[Shared] Is Loading';
export const SET_ERROR_MESSAGE = '[Shared] Error';

export const setIsLoading = createAction(
	SET_LOADING_ACTION,
	props<{ status: boolean }>()
);

export const setError = createAction(
	SET_ERROR_MESSAGE,
	props<{ error?: string }>()
);

export const clearError = createAction('[Shared] Clear Error')