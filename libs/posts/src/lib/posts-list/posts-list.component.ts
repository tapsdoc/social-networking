import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PostCardComponent } from './post-card/post-card.component';
import { setIsLoading, SnackBarComponent } from '@social-networking/shared-ui';
import { Store } from '@ngrx/store';
import { PostsState } from '../store/posts.reducer';
import { selectAllPosts } from '../store/posts.selectors';
import { initDeletePost, initDownvote, initPosts, initUpvote } from '../store/posts.actions';
import { PostsEntity } from '../store/posts.models';
import * as fromShared from '@social-networking/shared-ui';

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
	isVoted = false;
	
	constructor(private store: Store<PostsState>) { }
	
	ngOnInit() {
		this.store.dispatch(setIsLoading({ status: true }));
		this.store.dispatch(initPosts());
		this.posts$ = this.store.select(selectAllPosts);
	}
	
	onUpvote(data: { id: number; isVoted: boolean }) {
		this.store.dispatch(fromShared.setIsLoading({ status: true }));
		if (data.isVoted) {
			this.store.dispatch(initUpvote({ id: data.id }));
			this.isVoted = !this.isVoted;
		} else {
			this.store.dispatch(initDownvote({ id: data.id }));
			this.isVoted = !this.isVoted;
		}
	}
	
	onDelete(id: number) {
		this.store.dispatch(fromShared.setIsLoading({ status: false }));
		this.store.dispatch(initDeletePost({ id: id }));
	}
}