import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService, PostWithVotes } from '@social-networking/services';
import { Subscription } from 'rxjs';
import { PostCardComponent } from './post-card/post-card.component';
import { LoadingSpinnerComponent, SnackBarComponent } from '@social-networking/shared-ui';
import { Store } from '@ngrx/store';
import { PostsState } from '../store/posts.reducer';

@Component({
	selector: 'lib-posts-list',
	standalone: true,
	imports: [
		CommonModule,
		PostCardComponent,
		SnackBarComponent,
		LoadingSpinnerComponent
	],
	templateUrl: './posts-list.component.html',
	styleUrl: './posts-list.component.css'
})
export class PostsListComponent implements OnInit, OnDestroy {
	
	posts: PostWithVotes[] = [];
	message!: string | null;
	type!: string | null;
	private subs!: Subscription;
	
	constructor(
		private postsService: PostsService,
		private store: Store<PostsState>,
	) { }
	
	ngOnInit() {
		this.getPosts();
	}
	
	onUpvote(post: PostWithVotes) {
		this.postsService.upvotePostPostsPostIdUpvotePut({ post_id: post.id })
		.subscribe({
			error: err => {
				this.type = 'error';
				
				if(err.statusText === 'Unknown Error') {
					this.message = 'An error occurred!';
				} else this.message = err.error?.detail;
				console.log(err);
			}
		});
		this.type = ''
		this.message = '';
	}
	
	onDownvote(post: PostWithVotes) {
		this.postsService.downvotePostPostsPostIdDownvotePut({ post_id: post.id })
		.subscribe({
			error: err => {
				this.type = 'error';
				
				if(err.statusText === 'Unknown Error') {
					this.message = 'An error occurred!';
				} else this.message = err.error?.detail;
				console.log(err);
			}
		});
		this.type = '';
		this.message = '';
	}
	
	onDelete(post: PostWithVotes) {
		this.postsService.deletePostPostsPostIdDelete({
			post_id: post.id
		}).subscribe({
			next: () => {
				this.type = 'success';
				this.message = 'Deleted';
				this.getPosts();
			},
			error: err => {
				this.type = 'error';
				
				if(err.statusText === 'Unknown Error') {
					this.message = 'An error occurred!';
				} else this.message = err.error?.detail;
			},
			complete: () => {
				this.type = null;
				this.message = null;
			}
		})
	}
	
	private getPosts() {
		this.subs = this.postsService.getAllPostsPostsGet()
		.subscribe({
			next: posts => {
				this.posts = posts;
			},
			error: err => {
				this.type = 'error';
				if (err.statusText === 'Unknown Error') {
					this.message = 'An error occurred!';
				} else this.message = err.error?.detail;
			}
		});
	}
	
	ngOnDestroy() {
		this.subs.unsubscribe();
	}
}