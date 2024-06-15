import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { LoadingComponent, SnackBarComponent } from '@social-networking/shared-ui';
import { Store } from '@ngrx/store';
import { PostsState } from '../store/posts.reducer';
import { selectPost, selectPostsState } from '../store/posts.selectors';
import { initAddPost, initEditPost, initGetPost, clearError } from '../store/posts.actions';
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
	error!: string | null;
	type!: string | null;
	isLoading = false;
	id!: number;
	editMode = false;
	post!: PostsEntity;
	private subs!: Subscription;
	
	constructor(
		private fb: FormBuilder,
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
					this.store.dispatch(initGetPost({ id: this.id }));
					this.subs = this.store.select(selectPost)
					.subscribe(post => {
						if (post) this.post = post;
					});
					this.store.dispatch(clearError())
				}
				
				this.getPostState();
				this.initForm();
			}
		);
	}
	
	private getPostState() {
		this.subs = this.store.select(selectPostsState)
		.pipe(
			map(state => {
				const { isLoading, error } = state;
				return { isLoading, error };
			})
		).subscribe({
			next: (state) => {
				this.isLoading = state.isLoading;
				if (state.error) {
					this.type = 'error';
					if (state.error.statusText === 'Unknown Error') {
						this.error = 'An error occurred!';
					} else this.error = state.error.error?.detail;
					console.log(state.error);
				}
			}
		});
	}
	
	onSubmit() {
		if (this.editMode) {
			this.store.dispatch(initEditPost({
				id: this.id,
				payload: this.form.value
			}));
		} else {
			this.store.dispatch(initAddPost({ payload: this.form.value }));
		}
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
