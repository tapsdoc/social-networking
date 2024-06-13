import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '@social-networking/services';
import { Observable } from 'rxjs';
import { PostCardComponent } from './post-card/post-card.component';
import { LoadingSpinnerComponent, SnackBarComponent } from '@social-networking/shared-ui';
import { Store } from '@ngrx/store';
import { PostsState } from '../store/posts.reducer';
import { selectAllPosts } from '../store/posts.selectors';
import { initPosts } from '../store/posts.actions';
import { PostsEntity } from '../store/posts.models';

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
export class PostsListComponent implements OnInit {
	
	posts$!: Observable<PostsEntity[]>;
	message!: string | null;
	type!: string | null;
	
	constructor(
		private postsService: PostsService,
		private store: Store<PostsState>
	) {
	}
	
	ngOnInit() {
		this.store.dispatch(initPosts());
		this.posts$ = this.store.select(selectAllPosts);
	}
	
	onUpvote(post: PostsEntity) {
		this.postsService.upvotePostPostsPostIdUpvotePut({ post_id: post.id })
		.subscribe({
			error: err => {
				this.type = 'error';
				
				if (err.statusText === 'Unknown Error') {
					this.message = 'An error occurred!';
				} else this.message = err.error?.detail;
				console.log(err);
			}
		});
		this.type = null;
		this.message = null;
	}
	
	onDownvote(post: PostsEntity) {
		this.postsService.downvotePostPostsPostIdDownvotePut({
			post_id: post.id
		}).subscribe({
			error: err => {
				this.type = 'error';
				
				if (err.statusText === 'Unknown Error') {
					this.message = 'An error occurred!';
				} else this.message = err.error?.detail;
				console.log(err);
			}
		});
		this.type = null;
		this.message = null;
	}
	
	onDelete(post: PostsEntity) {
		this.postsService.deletePostPostsPostIdDelete({
			post_id: post.id
		}).subscribe({
			next: () => {
				this.type = 'success';
				this.message = 'Deleted';
			},
			error: err => {
				this.type = 'error';
				console.log(err.error);
				if (err.statusText === 'Unknown Error') {
					this.message = 'An error occurred!';
				} else this.message = 'Failed to delete';
			},
			complete: () => {
				this.type = null;
				this.message = null;
			}
		});
	}
}