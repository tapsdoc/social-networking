import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as PostsActions from './posts.actions';
import { PostsEntity } from './posts.models';

export const POSTS_FEATURE_KEY = 'posts';

export interface PostsState extends EntityState<PostsEntity> {
	selectedId?: string | number;
	loaded: boolean;
}

export interface PostsPartialState {
	readonly [POSTS_FEATURE_KEY]: PostsState;
}

export const postsAdapter: EntityAdapter<PostsEntity> =
	createEntityAdapter<PostsEntity>();

export const initialPostsState: PostsState = postsAdapter.getInitialState({
	loaded: false
});

const reducer = createReducer(
	initialPostsState,
	on(PostsActions.initPosts, (state) => ({
		...state,
		loaded: false,
		selectedId: undefined,
	})),
	on(PostsActions.loadPostsSuccess, (state, { posts }) =>
		postsAdapter.setAll(posts, {
			...state,
			loaded: true,
	})),
	on(
		PostsActions.initGetPost,
		PostsActions.initDeletePost,
		PostsActions.initUpvote,
		PostsActions.initDownvote,
		(state, { id }) => ({
		...state,
		selectedId: id,
		loaded: false,
	})),
	on(PostsActions.initEditPost, (state, { id, payload }) => ({
		...state,
		selectedId: id,
		post: payload
	})),
	on(PostsActions.loadPostSuccess, (state, { post }) =>
		postsAdapter.setOne(post, {
			...state,
			loaded: true
		})
	),
	on(PostsActions.initAddPost, (state) => ({
		...state,
		selectedId: undefined,
	})),
	on(PostsActions.addPostSuccess, (state, { post }) => ({
		...state,
		post: post,
	})),
	on(PostsActions.editPostSuccess, (state, { post }) => ({
		...state,
		post: post,
		selectedId: undefined,
	})),
	on(PostsActions.deletePostSuccess, (state ) => (
		postsAdapter.removeOne(state.selectedId as number, {
			...state,
			selectedId: undefined,
		})
	)),
	on(PostsActions.upvoteSuccess, (state ) => {
		
		const postToUpdate = state.entities[state.selectedId as number];
		if (postToUpdate) {
			const updatedPost = { ...postToUpdate, votes: postToUpdate.votes as number + 1 };
			return postsAdapter.updateOne({
				id: state.selectedId as number,
				changes: updatedPost
			}, {
				...state,
				selectedId: undefined
			});
		} else return state;
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
				selectedId: undefined
			});
		} else return state;
	}),
);

export function postsReducer(state: PostsState | undefined, action: Action) {
	return reducer(state, action);
}
