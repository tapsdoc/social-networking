import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, exhaustMap, take, tap, mergeMap, switchMap, concatMap } from 'rxjs';
import * as PostsActions from './posts.actions';
import { PostsService } from '@social-networking/services';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import * as fromShared from '@social-networking/shared-ui';
import { Store } from '@ngrx/store';
import { SharedState } from '@social-networking/shared-ui';

@Injectable()
export class PostsEffects {
	
	private actions$ = inject(Actions);
	private postsService = inject(PostsService);
	private router = inject(Router);
	private store = inject(Store<SharedState>);
	
	loadPosts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostsActions.initPosts),
			switchMap(() => this.postsService.getAllPostsPostsGet()
			.pipe(
				take(1),
				map(posts => {
					this.store.dispatch(fromShared.setIsLoading({ status: false }));
					this.store.dispatch(fromShared.setError({ error: undefined }));
					return PostsActions.loadPostsSuccess({ posts: posts });
				}),
				catchError((error: HttpErrorResponse) => {
					console.error(error)
					this.store.dispatch(fromShared.setIsLoading({ status: false }));
					let err: string;
					if (error.statusText === 'Unknown Error')
						err = 'An error occurred. Please try again'
					else err = error.error?.detail
					return of(fromShared.setError({ error: err }));
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
					map(post => {
						this.store.dispatch(fromShared.setIsLoading({ status: false }));
						this.store.dispatch(fromShared.setError({ error: undefined }));
						return PostsActions.loadPostSuccess({ post: post })
					}),
					catchError((error: HttpErrorResponse) => {
						console.error(error)
						this.store.dispatch(fromShared.setIsLoading({ status: false }));
						let err: string;
						if (error.statusText === 'Unknown Error')
							err = 'An error occurred. Please try again'
						else err = error.error?.detail
						return of(fromShared.setError({ error: err }));
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
					map(post => {
						this.store.dispatch(fromShared.setIsLoading({ status: false }));
						this.store.dispatch(fromShared.setError({ error: undefined }));
						return PostsActions.addPostSuccess({ post: post });
					}),
					catchError((error: HttpErrorResponse) => {
						console.error(error)
						this.store.dispatch(fromShared.setIsLoading({ status: false }));
						let err: string;
						if (error.statusText === 'Unknown Error')
							err = 'An error occurred. Please try again';
						else err = error.error?.detail;
						return of(fromShared.setError({ error: err }));
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
					map(post => {
						this.store.dispatch(fromShared.setIsLoading({ status: false }));
						this.store.dispatch(fromShared.setError({ error: undefined }));
						return PostsActions.editPostSuccess({ post: post });
					}),
					catchError((error: HttpErrorResponse) => {
						console.error(error)
						this.store.dispatch(fromShared.setIsLoading({ status: false }));
						let err: string;
						if (error.statusText === 'Unknown Error')
							err = 'An error occurred. Please try again';
						else err = error.error?.detail;
						return of(fromShared.setError({ error: err }));
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
					map(() => {
						this.store.dispatch(fromShared.setIsLoading({ status: false }));
						this.store.dispatch(fromShared.setError({ error: undefined }));
						return PostsActions.deletePostSuccess();
					}),
					catchError((error: HttpErrorResponse) => {
						console.error(error)
						this.store.dispatch(fromShared.setIsLoading({ status: false }));
						let err: string;
						if (error.statusText === 'Unknown Error')
							err = 'An error occurred. Please try again';
						else err = error.error?.detail;
						return of(fromShared.setError({ error: err }));
					})
				)
			)
		)
	);
	
	upvote$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostsActions.initUpvote),
			concatMap(({ id }) =>
				this.postsService.upvotePostPostsPostIdUpvotePut({
					post_id: id
				}).pipe(
					map((post) => {
						this.store.dispatch(fromShared.setIsLoading({ status: false }));
						this.store.dispatch(fromShared.setError({ error: undefined }));
						return PostsActions.upvoteSuccess({ post: post });
					}),
					catchError((error: HttpErrorResponse) => {
						console.error(error)
						this.store.dispatch(fromShared.setIsLoading({ status: false }));
						let err: string;
						if (error.statusText === 'Unknown Error')
							err = 'An error occurred. Please try again';
						else err = error.error?.detail;
						return of(fromShared.setError({ error: err }));
					})
				)
			)
		)
	);
	
	downvote$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostsActions.initDownvote),
			concatMap(({ id }) =>
				this.postsService.downvotePostPostsPostIdDownvotePut({
					post_id: id
				}).pipe(
					map((post) => {
						this.store.dispatch(fromShared.setIsLoading({ status: false }));
						this.store.dispatch(fromShared.setError({ error: undefined }));
						return PostsActions.downvoteSuccess({ post: post });
					}),
					catchError((error: HttpErrorResponse) => {
						console.error(error)
						this.store.dispatch(fromShared.setIsLoading({ status: false }));
						let err: string;
						if (error.statusText === 'Unknown Error')
							err = 'An error occurred. Please try again'
						else err = error.error?.detail
						return of(fromShared.setError({ error: err }));
					})
				)
			)
		)
	);
}
