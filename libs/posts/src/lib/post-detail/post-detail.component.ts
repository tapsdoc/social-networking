import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService, PostWithVotes } from '@social-networking/services';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { PostsState } from '../store/posts.reducer';
import { map, Subscription } from 'rxjs';
import { selectPostsState } from '../store/posts.selectors';
import { PostsEntity } from '../store/posts.models';

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
	private subs!: Subscription;
	
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
				
				this.subs = this.store.select(selectPostsState)
				.pipe(
					map(state => {
						const { entities } = state;
						return Object.values(entities) as PostsEntity[];
					}),
					map(posts  => posts.find(post =>
						post.id === this.id
					))
				)
				.subscribe(post => {
					if (post) this.post = post;
				});
			}
		);
	}
	
	onEdit() {
		this.router.navigate(['edit'], { relativeTo: this.route }).then();
	}
}
