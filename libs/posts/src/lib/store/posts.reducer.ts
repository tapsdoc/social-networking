import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as PostsActions from './posts.actions';
import { PostsEntity } from './posts.models';
import { HttpErrorResponse } from '@angular/common/http';

export const POSTS_FEATURE_KEY = 'posts';

export interface PostsState extends EntityState<PostsEntity> {
	post: PostsEntity | null;
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
	post: null,
	isLoading: false,
	loaded: false
});

const reducer = createReducer(
	initialPostsState,
	on(PostsActions.initPosts, (state) => ({
		...state,
		loaded: false,
		selectedId: undefined,
		post: null,
		isLoading: true,
		error: null,
	})),
	on(PostsActions.loadPostsSuccess, (state, { posts }) =>
		postsAdapter.setAll(posts, {
			...state,
			isLoading: false,
			loaded: true,
	})),
	on(PostsActions.initGetPost, (state, { id }) => ({
		...state,
		selectedId: id,
		isLoading: true,
		loaded: false,
		error: null,
	})),
	on(PostsActions.loadPostSuccess, (state, { post }) => ({
		...state,
		post: post,
		isLoading: false,
		loaded: true
	})),
	on(PostsActions.initAddPost, (state) => ({
		...state,
		selectedId: undefined,
		isLoading: true,
		loaded: false,
		error: null,
	})),
	on(PostsActions.addPostSuccess, (state, { post }) => ({
		...state,
		post: post,
		isLoading: false,
		loaded: true
	})),
	on(PostsActions.initEditPost, (state, { id }) => ({
		...state,
		selectedId: id,
		isLoading: true,
		loaded: false,
		error: null,
	})),
	on(PostsActions.editPostSuccess, (state, { post }) => ({
		...state,
		post: post,
		isLoading: false,
		loaded: true
	})),
	on(PostsActions.loadPostsFailure, (state, { error }) => ({
		...state,
		isLoading: false,
		loaded: false,
		selectedId: undefined,
		post: null,
		error
	}))
);

export function postsReducer(state: PostsState | undefined, action: Action) {
	return reducer(state, action);
}
