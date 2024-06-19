import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PostCardComponent } from './post-card/post-card.component';
import { SnackBarComponent } from '@social-networking/shared-ui';
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
		SnackBarComponent
	],
	templateUrl: './posts-list.component.html',
	styleUrl: './posts-list.component.css'
})
export class PostsListComponent implements OnInit {
	
	posts$!: Observable<PostsEntity[]>;
	
	constructor(private store: Store<PostsState>) {
		this.store.dispatch(initPosts());
	}
	
	ngOnInit() {
		this.posts$ = this.store.select(selectAllPosts);
	}
}