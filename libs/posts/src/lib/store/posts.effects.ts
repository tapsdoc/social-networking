import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, exhaustMap, take, tap, mergeMap, switchMap } from 'rxjs';
import * as PostsActions from './posts.actions';
import { PostsService } from '@social-networking/services';
import { Router } from '@angular/router';

@Injectable()
export class PostsEffects {
	
	private actions$ = inject(Actions);
	private postsService = inject(PostsService);
	private router = inject(Router);
	
	loadPosts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostsActions.initPosts),
			exhaustMap(() => this.postsService.getAllPostsPostsGet()
			.pipe(
				take(1),
				map(posts =>
					PostsActions.loadPostsSuccess({ posts: posts })
				),
				catchError((error) => {
					console.error('Error', error);
					return of(PostsActions.loadPostsFailure({ error }));
				})
			))
		)
	);

	loadPost$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostsActions.initGetPost),
			switchMap(({ id }) =>
				this.postsService.getPostPostsPostIdGet({
					post_id: id
				}).pipe(
					map(post =>
						PostsActions.loadPostSuccess({ post: post })
					),
					catchError((error) => {
						console.error(error);
						return of(PostsActions.loadPostsFailure({ error }));
					})
				)
			)
		)
	);
	
	addPost$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostsActions.initAddPost),
			exhaustMap(({ payload }) =>
				this.postsService.createPostPostsPost({
					body: payload
				}).pipe(
					tap(() => {
						this.router.navigate(['/posts']).then();
					}),
					map(post =>
						PostsActions.addPostSuccess({ post: post })
					),
					catchError((error) => {
						console.error(error);
						return of(PostsActions.loadPostsFailure({ error }));
					})
				)
			)
		)
	);
	
	updatePost$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostsActions.initEditPost),
			exhaustMap(({ id, payload }) =>
				this.postsService.updatePostPostsPostIdPut({
					post_id: id,
					body: payload
				}).pipe(
					tap(() => {
						this.router.navigate(['/posts']).then();
					}),
					map(post =>
						PostsActions.editPostSuccess({ post: post })
					),
					catchError((error) => {
						console.error(error);
						return of(PostsActions.loadPostsFailure({ error }));
					})
				)
			)
		)
	);
	
	deletePost$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostsActions.initDeletePost),
			mergeMap(({ id }) =>
				this.postsService.deletePostPostsPostIdDelete({
					post_id: id
				}).pipe(
					map(() =>
						PostsActions.deletePostSuccess()
					),
					catchError((error) => {
						console.error(error);
						return of(PostsActions.loadPostsFailure({ error }));
					})
				)
			)
		)
	);
	
	upvote$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostsActions.initUpvote),
			exhaustMap(({ id }) =>
				this.postsService.upvotePostPostsPostIdUpvotePut({
					post_id: id
				}).pipe(
					map((post) =>
						PostsActions.upvoteSuccess({ post: post })
					),
					catchError((error) => {
						console.error(error);
						return of(PostsActions.loadPostsFailure({ error }));
					})
				)
			)
		)
	);
	
	downvote$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostsActions.initDownvote),
			exhaustMap(({ id }) =>
				this.postsService.downvotePostPostsPostIdDownvotePut({
					post_id: id
				}).pipe(
					map((post) =>
						PostsActions.downvoteSuccess({ post: post })
					),
					catchError((error) => {
						console.error(error);
						return of(PostsActions.loadPostsFailure({ error }));
					})
				)
			)
		)
	);
}
