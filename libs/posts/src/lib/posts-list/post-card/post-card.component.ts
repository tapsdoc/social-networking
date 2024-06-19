import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostsEntity } from '../../store/posts.models';
import * as fromShared from '@social-networking/shared-ui';
import { Store } from '@ngrx/store';
import * as PostsActions from '../../store/posts.actions';
import { PostsState } from '../../store/posts.reducer';

@Component({
	selector: 'lib-post-card',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './post-card.component.html',
	styleUrl: './post-card.component.css'
})
export class PostCardComponent {
	
	@Input() post!: PostsEntity;
	isOpen = false;
	isVoted = false;
	
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private store: Store<PostsState>
	) { }
	
	onUpvoteOrDownvote(id: number) {
		this.isVoted = !this.isVoted;
		this.store.dispatch(fromShared.setIsLoading({ status: true }));
		if (this.isVoted) {
			this.store.dispatch(PostsActions.initUpvote({ id: id }));
		} else {
			this.store.dispatch(PostsActions.initDownvote({ id: id }));
		}
	}
	
	onSelect() {
		this.router.navigate(
			[`${this.post.id}`],
			{ relativeTo: this.route }
		).then();
	}
	
	onEdit() {
		this.router.navigate(
			[`${this.post.id}/edit`],
			{ relativeTo: this.route }
		).then();
	}
	
	onDelete(id: number) {
		this.store.dispatch(fromShared.setIsLoading({ status: true }));
		this.store.dispatch(PostsActions.initDeletePost({ id: id }));
		this.toggleDropdown();
	}
	
	toggleDropdown() {
		this.isOpen = !this.isOpen;
	}
}
