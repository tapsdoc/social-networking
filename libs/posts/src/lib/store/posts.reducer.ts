import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as PostsActions from './posts.actions';
import { PostsEntity } from './posts.models';
import { HttpErrorResponse } from '@angular/common/http';

export const POSTS_FEATURE_KEY = 'posts';

export interface PostsState extends EntityState<PostsEntity> {
	isLoading: boolean;
	selectedId?: string | number; // which Posts record has been selected
	loaded: boolean; // has the Posts list been loaded
	error?: HttpErrorResponse | null; // last known error (if any)
}

export interface PostsPartialState {
	readonly [POSTS_FEATURE_KEY]: PostsState;
}

export const postsAdapter: EntityAdapter<PostsEntity> =
	createEntityAdapter<PostsEntity>();

export const initialPostsState: PostsState = postsAdapter.getInitialState({
	isLoading: false,
	loaded: false
});

const reducer = createReducer(
	initialPostsState,
	on(PostsActions.loadPostsSuccess, (state, { posts }) =>
		postsAdapter.setAll(posts, {
			...state,
			isLoading: false,
			loaded: true,
			error: null
		})
	),
	on(PostsActions.loadPostsFailure, (state, { error }) => ({
		...state,
		isLoading: false,
		error
	}))
);

export function postsReducer(state: PostsState | undefined, action: Action) {
	return reducer(state, action);
}
