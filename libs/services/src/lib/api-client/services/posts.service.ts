/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createPostPostsPost } from '../fn/posts/create-post-posts-post';
import { CreatePostPostsPost$Params } from '../fn/posts/create-post-posts-post';
import { deletePostPostsPostIdDelete } from '../fn/posts/delete-post-posts-post-id-delete';
import { DeletePostPostsPostIdDelete$Params } from '../fn/posts/delete-post-posts-post-id-delete';
import { downvotePostPostsPostIdDownvotePut } from '../fn/posts/downvote-post-posts-post-id-downvote-put';
import { DownvotePostPostsPostIdDownvotePut$Params } from '../fn/posts/downvote-post-posts-post-id-downvote-put';
import { getAllPostsPostsGet } from '../fn/posts/get-all-posts-posts-get';
import { GetAllPostsPostsGet$Params } from '../fn/posts/get-all-posts-posts-get';
import { getPostPostsPostIdGet } from '../fn/posts/get-post-posts-post-id-get';
import { GetPostPostsPostIdGet$Params } from '../fn/posts/get-post-posts-post-id-get';
import { Post } from '../models/post';
import { PostWithVotes } from '../models/post-with-votes';
import { updatePostPostsPostIdPut } from '../fn/posts/update-post-posts-post-id-put';
import { UpdatePostPostsPostIdPut$Params } from '../fn/posts/update-post-posts-post-id-put';
import { upvotePostPostsPostIdUpvotePut } from '../fn/posts/upvote-post-posts-post-id-upvote-put';
import { UpvotePostPostsPostIdUpvotePut$Params } from '../fn/posts/upvote-post-posts-post-id-upvote-put';

@Injectable({ providedIn: 'root' })
export class PostsService extends BaseService {
	
	constructor(
		config: ApiConfiguration,
		http: HttpClient,
	) {
		super(config, http);
	}
	
	/** Path part for operation `getAllPostsPostsGet()` */
	static readonly GetAllPostsPostsGetPath = '/posts';
	
	/**
	 * Get all posts.
	 *
	 * Get all Postify posts.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getAllPostsPostsGet()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getAllPostsPostsGet$Response(params?: GetAllPostsPostsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PostWithVotes>>> {
		return getAllPostsPostsGet(this.http, this.rootUrl, params, context);
	}
	
	/**
	 * Get all posts.
	 *
	 * Get all Postify posts.
	 *
	 * This method provides access only to the response body.
	 * To access the full response (for headers, for example), `getAllPostsPostsGet$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getAllPostsPostsGet(params?: GetAllPostsPostsGet$Params, context?: HttpContext): Observable<Array<PostWithVotes>> {
		return this.getAllPostsPostsGet$Response(params, context).pipe(
			map((r: StrictHttpResponse<Array<PostWithVotes>>): Array<PostWithVotes> => r.body)
		);
	}
	
	/** Path part for operation `createPostPostsPost()` */
	static readonly CreatePostPostsPostPath = '/posts';
	
	/**
	 * Create a new post.
	 *
	 * Create a new post with the provided title and content.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `createPostPostsPost()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createPostPostsPost$Response(params: CreatePostPostsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Post>> {
		return createPostPostsPost(this.http, this.rootUrl, params, context);
	}
	
	/**
	 * Create a new post.
	 *
	 * Create a new post with the provided title and content.
	 *
	 * This method provides access only to the response body.
	 * To access the full response (for headers, for example), `createPostPostsPost$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	createPostPostsPost(params: CreatePostPostsPost$Params, context?: HttpContext): Observable<Post> {
		return this.createPostPostsPost$Response(params, context).pipe(
			map((r: StrictHttpResponse<Post>): Post => r.body)
		);
	}
	
	/** Path part for operation `getPostPostsPostIdGet()` */
	static readonly GetPostPostsPostIdGetPath = '/posts/{post_id}';
	
	/**
	 * Get a post.
	 *
	 * Get a post by its ID.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `getPostPostsPostIdGet()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getPostPostsPostIdGet$Response(params: GetPostPostsPostIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<PostWithVotes>> {
		return getPostPostsPostIdGet(this.http, this.rootUrl, params, context);
	}
	
	/**
	 * Get a post.
	 *
	 * Get a post by its ID.
	 *
	 * This method provides access only to the response body.
	 * To access the full response (for headers, for example), `getPostPostsPostIdGet$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	getPostPostsPostIdGet(params: GetPostPostsPostIdGet$Params, context?: HttpContext): Observable<PostWithVotes> {
		return this.getPostPostsPostIdGet$Response(params, context).pipe(
			map((r: StrictHttpResponse<PostWithVotes>): PostWithVotes => r.body)
		);
	}
	
	/** Path part for operation `updatePostPostsPostIdPut()` */
	static readonly UpdatePostPostsPostIdPutPath = '/posts/{post_id}';
	
	/**
	 * Update a post.
	 *
	 * Update a post by its ID.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `updatePostPostsPostIdPut()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	updatePostPostsPostIdPut$Response(params: UpdatePostPostsPostIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Post>> {
		return updatePostPostsPostIdPut(this.http, this.rootUrl, params, context);
	}
	
	/**
	 * Update a post.
	 *
	 * Update a post by its ID.
	 *
	 * This method provides access only to the response body.
	 * To access the full response (for headers, for example), `updatePostPostsPostIdPut$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	updatePostPostsPostIdPut(params: UpdatePostPostsPostIdPut$Params, context?: HttpContext): Observable<Post> {
		return this.updatePostPostsPostIdPut$Response(params, context).pipe(
			map((r: StrictHttpResponse<Post>): Post => r.body)
		);
	}
	
	/** Path part for operation `deletePostPostsPostIdDelete()` */
	static readonly DeletePostPostsPostIdDeletePath = '/posts/{post_id}';
	
	/**
	 * Delete a post.
	 *
	 * Delete a post by its ID.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `deletePostPostsPostIdDelete()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	deletePostPostsPostIdDelete$Response(params: DeletePostPostsPostIdDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
		return deletePostPostsPostIdDelete(this.http, this.rootUrl, params, context);
	}
	
	/**
	 * Delete a post.
	 *
	 * Delete a post by its ID.
	 *
	 * This method provides access only to the response body.
	 * To access the full response (for headers, for example), `deletePostPostsPostIdDelete$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	deletePostPostsPostIdDelete(params: DeletePostPostsPostIdDelete$Params, context?: HttpContext): Observable<void> {
		return this.deletePostPostsPostIdDelete$Response(params, context).pipe(
			map((r: StrictHttpResponse<void>): void => r.body)
		);
	}
	
	/** Path part for operation `upvotePostPostsPostIdUpvotePut()` */
	static readonly UpvotePostPostsPostIdUpvotePutPath = '/posts/{post_id}/upvote';
	
	/**
	 * Upvote a post.
	 *
	 * Upvote a post by its ID.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `upvotePostPostsPostIdUpvotePut()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	upvotePostPostsPostIdUpvotePut$Response(params: UpvotePostPostsPostIdUpvotePut$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
		return upvotePostPostsPostIdUpvotePut(this.http, this.rootUrl, params, context);
	}
	
	/**
	 * Upvote a post.
	 *
	 * Upvote a post by its ID.
	 *
	 * This method provides access only to the response body.
	 * To access the full response (for headers, for example), `upvotePostPostsPostIdUpvotePut$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	upvotePostPostsPostIdUpvotePut(params: UpvotePostPostsPostIdUpvotePut$Params, context?: HttpContext): Observable<any> {
		return this.upvotePostPostsPostIdUpvotePut$Response(params, context).pipe(
			map((r: StrictHttpResponse<any>): any => r.body)
		);
	}
	
	/** Path part for operation `downvotePostPostsPostIdDownvotePut()` */
	static readonly DownvotePostPostsPostIdDownvotePutPath = '/posts/{post_id}/downvote';
	
	/**
	 * Downvote a post.
	 *
	 * Downvote a post by its ID.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `downvotePostPostsPostIdDownvotePut()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	downvotePostPostsPostIdDownvotePut$Response(params: DownvotePostPostsPostIdDownvotePut$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
		return downvotePostPostsPostIdDownvotePut(this.http, this.rootUrl, params, context);
	}
	
	/**
	 * Downvote a post.
	 *
	 * Downvote a post by its ID.
	 *
	 * This method provides access only to the response body.
	 * To access the full response (for headers, for example), `downvotePostPostsPostIdDownvotePut$Response()` instead.
	 *
	 * This method doesn't expect any request body.
	 */
	downvotePostPostsPostIdDownvotePut(params: DownvotePostPostsPostIdDownvotePut$Params, context?: HttpContext): Observable<any> {
		return this.downvotePostPostsPostIdDownvotePut$Response(params, context).pipe(
			map((r: StrictHttpResponse<any>): any => r.body)
		);
	}
	
}
