import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post, PostsService, PostWithVotes } from '@social-networking/services';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { LoadingComponent, SnackBarComponent } from '@social-networking/shared-ui';
import { Store } from '@ngrx/store';
import { PostsState } from '../store/posts.reducer';
import { selectPostsState } from '../store/posts.selectors';
import { PostsEntity } from '../store/posts.models';

@Component({
	selector: 'lib-create-post',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		SnackBarComponent,
		LoadingComponent
	],
	templateUrl: './create-post.component.html',
	styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit, OnDestroy {
	
	form!: FormGroup;
	message!: string | null;
	type!: string | null;
	loading = false;
	id!: number;
	editMode = false;
	post!: PostWithVotes;
	private subs!: Subscription;
	
	constructor(
		private fb: FormBuilder,
		private postsService: PostsService,
		private router: Router,
		private route: ActivatedRoute,
		private store: Store<PostsState>,
	) { }
	
	ngOnInit() {
		this.route.params.subscribe(
			params => {
				this.id = +params['id'];
				this.editMode = params['id'] != null;
				if (this.editMode) {
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
				this.initForm();
			}
		);
	}
	
	onSubmit() {
		this.loading = true;
		console.log(this.form.value);
		let postObs: Observable<PostWithVotes | Post>;
		if (this.editMode) {
			postObs = this.postsService.updatePostPostsPostIdPut({
				post_id: this.id,
				body: this.form.value
			});
		} else {
			postObs = this.postsService.createPostPostsPost({
				body: this.form.value
			});
		}
		
		postObs.subscribe({
			next: () => {
				this.type = 'success';
				this.message = 'Post published';
				this.form.reset();
				this.router.navigate(['/posts']).then();
			},
			error: err => {
				this.type = 'error';
				
				if(err.statusText === 'Unknown Error') {
					this.message = 'An error occurred!';
				} else this.message = err.error?.detail;
				this.loading = false;
				console.log(err);
			},
			complete: ()=> {
				this.loading = false;
				this.type = null;
				this.message = null;
			}
		});
	}
	
	onCancel() {
		this.router.navigate(['/posts']).then();
	}
	
	private initForm(){
		if (this.editMode) {
			this.form = this.fb.group({
				'title': new FormControl(this.post.title, Validators.required),
				'content': new FormControl(this.post.content, Validators.required),
				'published': new FormControl(this.post.published)
			});
		} else {
			this.form = this.fb.group({
				
				title: new FormControl('', Validators.required),
				content: new FormControl('', Validators.required),
				published: new FormControl(true)
			});
		}
	}
	
	ngOnDestroy() {
		if (this.subs) this.subs.unsubscribe();
	}
}
