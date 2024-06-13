import { createAction, props } from '@ngrx/store';
import { PostsEntity } from './posts.models';
import { HttpErrorResponse } from '@angular/common/http';

export const initPosts = createAction('[Posts Page] Init');

export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ posts: PostsEntity[] }>()
);

export const loadPostsFailure = createAction(
  '[Posts] Load Posts Failure',
  props<{ error: HttpErrorResponse }>()
);
