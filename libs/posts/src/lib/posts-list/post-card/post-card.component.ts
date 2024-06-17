import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostsEntity } from '../../store/posts.models';

@Component({
	selector: 'lib-post-card',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './post-card.component.html',
	styleUrl: './post-card.component.css'
})
export class PostCardComponent {
	
	@Input() post!: PostsEntity;
	@Output() vote = new EventEmitter<{
		id: number,
		isVoted: boolean
	}>();
	@Output() delete = new EventEmitter<number>();
	isOpen = false;
	isVoted = false;
	
	constructor(
		private router: Router,
		private route: ActivatedRoute,
	) { }
	
	toggleDropdown() {
		this.isOpen = !this.isOpen;
	}
	
	onUpvoteOrDownvote() {
		this.isVoted = !this.isVoted;
		this.vote.emit({
			id: this.post.id,
			isVoted: !this.isVoted
		});
		console.log(this.isVoted);
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
		this.delete.emit(this.post.id);
		this.toggleDropdown();
	}
}
