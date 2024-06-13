import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService, PostWithVotes } from '@social-networking/services';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { PostsState } from '../store/posts.reducer';
import { map } from 'rxjs';

@Component({
	selector: 'lib-post-detail',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './post-detail.component.html',
	styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {
	id!: number;
	post!: PostWithVotes;
	
	constructor(
		private postsService: PostsService,
      private router: Router,
		private route: ActivatedRoute,
		private store: Store<PostsState>,
	) { }
	
	ngOnInit() {
		this.route.params.subscribe(
			(params: Params) => {
				this.id = +params['id'];
				this.postsService.getPostPostsPostIdGet({ post_id: this.id })
				.subscribe({
					next: (post) => {
						this.post = post;
					}, error: (err) => {
						console.log(err);
					}
				});
			}
		);
	}
	
	onEdit() {
		this.router.navigate(['edit'], { relativeTo: this.route }).then();
	}
}
