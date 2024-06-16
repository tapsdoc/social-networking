import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { PostsState } from '../store/posts.reducer';
import { Subscription } from 'rxjs';
import { selectPost } from '../store/posts.selectors';
import { initGetPost } from '../store/posts.actions';
import { PostsEntity } from '../store/posts.models';

@Component({
	selector: 'lib-post-detail',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './post-detail.component.html',
	styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit, OnDestroy {
	id!: number;
	post!: PostsEntity;
	private subs!: Subscription;
	
	constructor(
		private route: ActivatedRoute,
		private store: Store<PostsState>	) { }
	
	ngOnInit() {
		this.route.params.subscribe(
			(params: Params) => {
				this.id = +params['id'];
				this.store.dispatch(initGetPost({ id: this.id }));
				this.subs = this.store.select(selectPost)
				.subscribe(post => {
					if (post) this.post = post;
				});
			}
		);
	}
	
	ngOnDestroy() {
		this.subs.unsubscribe();
	}
}