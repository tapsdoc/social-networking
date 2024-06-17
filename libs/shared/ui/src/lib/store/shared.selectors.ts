import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SHARED_FEATURE_KEY, SharedState } from './shared.reducer';

const selectSharedState = createFeatureSelector<SharedState>(SHARED_FEATURE_KEY);

export const selectIsLoading = createSelector(selectSharedState, (state) => {
	return state.isLoading;
});

export const selectError = createSelector(selectSharedState, (state) => {
	return state.error;
});
