import { createReducer, on, Action } from '@ngrx/store';
import { clearError, setError, setIsLoading } from './shared.actions';

export const SHARED_FEATURE_KEY = 'shared';

export interface SharedState {
   isLoading: boolean
	error?: string;
}

export interface SharedPartialState {
	readonly [SHARED_FEATURE_KEY]: SharedState;
}

export const initialState: SharedState = {
   isLoading: false,
};

const reducer = createReducer(
	initialState,
   on(setIsLoading, (state, { status }) => {
      return {
         ...state,
         isLoading: status,
      };
   }),
   on(setError, (state, { error }) => {
      return {
         ...state,
         error: error,
      };
   }),
	on(clearError, (state) => ({
		...state,
		error: undefined
	})),
);

export function sharedReducer(state: SharedState | undefined, action: Action) {
	return reducer(state, action);
}
