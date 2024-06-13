import { createAction, props } from '@ngrx/store';
import { PostCreateEntity, PostsEntity, PostUpdateEntity } from './posts.models';
import { HttpErrorResponse } from '@angular/common/http';

export const initPosts = createAction('[Posts Page] Init');

export const initGetPost = createAction(
	'[Get Post] Init',
	props<{ id: number }>()
)

export const initAddPost = createAction(
	'[Add Post] Init',
	props<{ payload: PostCreateEntity }>()
);

export const initEditPost = createAction(
	'[Edit Post] Init',
	props<{ id: number, payload: PostUpdateEntity }>()
);

export const editPostSuccess = createAction(
	'[Posts] Add Post Success',
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
