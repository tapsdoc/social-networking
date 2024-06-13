import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService, PostWithVotes } from '@social-networking/services';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
	selector: 'lib-post-card',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './post-card.component.html',
	styleUrl: './post-card.component.css'
})
export class PostCardComponent {
	
	@Input() post!: PostWithVotes;
	@Output() upvote = new EventEmitter<PostWithVotes>();
	@Output() downvote = new EventEmitter<PostWithVotes>();
	@Output() delete = new EventEmitter<PostWithVotes>();
	isOpen = false;
	
	constructor(
		private postsService: PostsService,
		private router: Router,
		private route: ActivatedRoute
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
		this.postsService.selectedPost.emit(this.post);
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
