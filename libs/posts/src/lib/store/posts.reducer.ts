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
	on(
		PostsActions.initGetPost,
		PostsActions.initEditPost,
		PostsActions.initDeletePost,
		(state, { id }) => ({
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
		error: null,
	})),
	on(PostsActions.addPostSuccess, (state, { post }) => ({
		...state,
		post: post,
		isLoading: false,
		loaded: true
	})),
	on(PostsActions.editPostSuccess, (state, { post }) => ({
		...state,
		post: post,
		isLoading: false,
		loaded: true
	})),
	on(PostsActions.deletePostSuccess, (state ) => (
		postsAdapter.removeOne(state.selectedId as number, {
			...state,
			isLoading: false,
			selectedId: undefined,
		})
	)),
	on(PostsActions.initDownvote, PostsActions.initUpvote, (state, { id }) => ({
		...state,
		selectedId: id,
		isLoading: true,
	})),
	on(PostsActions.upvoteSuccess, (state ) => {
		
		const postToUpdate = state.entities[state.selectedId as number];
		if (postToUpdate) {
			const updatedPost = { ...postToUpdate, votes: postToUpdate.votes as number + 1 };
			return postsAdapter.updateOne({
				id: state.selectedId as number,
				changes: updatedPost
			}, {
				...state,
				isLoading: false,
				selectedId: undefined
			})
		} else {
			return state
		}
	}),
	on(PostsActions.downvoteSuccess, (state ) => {
		
		const postToUpdate = state.entities[state.selectedId as number];
		if (postToUpdate) {
			const updatedPost = { ...postToUpdate, votes: postToUpdate.votes as number - 1 };
			return postsAdapter.updateOne({
				id: state.selectedId as number,
				changes: updatedPost
			}, {
				...state,
				isLoading: false,
				selectedId: undefined
			})
		} else {
			return state
		}
	}),
	on(PostsActions.loadPostsFailure, (state, { error }) => ({
		...state,
		isLoading: false,
		loaded: false,
		selectedId: undefined,
		post: null,
		error
	})),
	on(PostsActions.clearError, (state) => ({
		...state,
		error: null
	}))
);

export function postsReducer(state: PostsState | undefined, action: Action) {
	return reducer(state, action);
}
