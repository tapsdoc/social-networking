import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, take, exhaustMap } from 'rxjs';
import * as PostsActions from './posts.actions';
import { PostsService } from '@social-networking/services';

@Injectable()
export class PostsEffects {
	private actions$ = inject(Actions);
	private postsService = inject(PostsService);
	
	
	loadPosts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostsActions.loadPostsSuccess),
			exhaustMap(() => this.postsService.getAllPostsPostsGet()
			.pipe(
				take(1),
				map(posts => PostsActions.loadPostsSuccess({ posts: posts})),
				catchError((error) => {
					console.error('Error', error);
					return of(PostsActions.loadPostsFailure({ error }));
				})
			))
		)
	);
}
