import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '@social-networking/services';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { PostsEntity, PostsState } from '@social-networking/posts';

@Component({
	selector: 'lib-post-card',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './post-card.component.html',
	styleUrl: './post-card.component.css'
})
export class PostCardComponent {
	
	@Input() post!: PostsEntity;
	@Output() upvote = new EventEmitter<PostsEntity>();
	@Output() downvote = new EventEmitter<PostsEntity>();
	@Output() delete = new EventEmitter<PostsEntity>();
	isOpen = false;
	
	constructor(
		private postsService: PostsService,
		private router: Router,
		private route: ActivatedRoute,
		private store: Store<PostsState>,
	) { }
	
	toggleDropdown() {
		this.isOpen = !this.isOpen;
	}
	
	onUpvote() {
		this.upvote.emit(this.post);
	}
	
	onDownvote() {
		this.downvote.emit(this.post);
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
	
	onDelete() {
		this.delete.emit(this.post);
		this.toggleDropdown();
	}
}
