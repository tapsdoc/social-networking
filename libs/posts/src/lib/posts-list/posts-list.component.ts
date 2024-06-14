import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '@social-networking/services';
import { Observable } from 'rxjs';
import { PostCardComponent } from './post-card/post-card.component';
import { SnackBarComponent } from '@social-networking/shared-ui';
import { Store } from '@ngrx/store';
import { PostsState } from '../store/posts.reducer';
import { selectAllPosts } from '../store/posts.selectors';
import { initDeletePost, initPosts } from '../store/posts.actions';
import { PostsEntity } from '../store/posts.models';

@Component({
	selector: 'lib-posts-list',
	standalone: true,
	imports: [
		CommonModule,
		PostCardComponent,
		SnackBarComponent
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
	
	onUpvote(id: number) {
		this.postsService.upvotePostPostsPostIdUpvotePut({ post_id: id })
		.subscribe({
			error: err => {
				this.type = 'error';
				
				if (err.statusText === 'Unknown Error') {
					this.message = 'An error occurred!';
				} else this.message = err.error?.detail;
				if (this.message === 'Already voted') {
					this.onDownvote(id);
				}
				console.log(err);
			}
		});
		this.type = null;
		this.message = null;
	}
	
	onDownvote(id: number) {
		this.postsService.downvotePostPostsPostIdDownvotePut({
			post_id: id
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
	
	onDelete(id: number) {
		this.store.dispatch(initDeletePost({ id: id }));
	}
}