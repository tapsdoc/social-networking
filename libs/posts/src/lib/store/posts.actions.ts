import { createAction, props } from '@ngrx/store';
import { PostCreateEntity, PostsEntity, PostUpdateEntity } from './posts.models';
import { HttpErrorResponse } from '@angular/common/http';

export const initPosts = createAction('[Posts Page] Init');

export const initGetPost = createAction(
	'[Posts] Get Post Init',
	props<{ id: number }>()
);

export const initAddPost = createAction(
	'[Posts] Add Post Init',
	props<{ payload: PostCreateEntity }>()
);

export const initEditPost = createAction(
	'[Posts] Edit Post Init',
	props<{ id: number, payload: PostUpdateEntity }>()
);

export const initDeletePost = createAction(
	'[Posts] Delete Post Init',
	props<{ id: number }>()
);

export const initUpvote = createAction(
	'[Posts] Upvote Init',
	props<{ id: number }>()
);

export const initDownvote = createAction(
	'[Posts] Downvote Init',
	props<{ id: number }>()
);

export const upvoteSuccess = createAction(
	'[Posts] Upvote Success',
	props<{ post: PostsEntity }>()
);

export const downvoteSuccess = createAction(
	'[Posts] Downvote Success',
	props<{ post: PostsEntity }>()
);
export const deletePostSuccess = createAction('[Posts] Delete Success');

export const editPostSuccess = createAction(
	'[Posts] Edit Post Success',
	props<{ post: PostsEntity }>()
);

export const addPostSuccess = createAction(
	'[Posts] Add Post Success',
	props<{ post: PostsEntity }>()
)

export const loadPostsSuccess = createAction(
	'[Posts] Load Posts Success',
	props<{ posts: PostsEntity[] }>()
);

export const loadPostSuccess = createAction(
	'[Posts] Load Post Success',
	props<{ post: PostsEntity }>()
)

export const loadPostsFailure = createAction(
  '[Posts] Load Posts Failure',
  props<{ error: HttpErrorResponse }>()
);

export const clearError = createAction(
	'[Posts] Clear Error',
);