import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { LoadingComponent, SnackBarComponent } from '@social-networking/shared-ui';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth.reducer';
import { initLogin } from '../store/auth.actions';
import { map, Subscription } from 'rxjs';
import { selectAuthState } from '../store/auth.selectors';

@Component({
	selector: 'lib-login',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterLink,
		SnackBarComponent,
		LoadingComponent
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
	
	form!: FormGroup;
	isLoading = false;
	error!: string | null;
	type!: string | null;
	private subs!: Subscription;
	
	constructor(
		private store: Store<AuthState>
	) { }
	
	ngOnInit() {
		this.subs = this.store.select(selectAuthState)
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
					if(state.error.statusText === 'Unknown Error') {
						this.error = 'An error occurred!'
					} else this.error = state.error.error?.detail;
					console.log(state.error);
				}
			}
		});
		
		this.form = new FormGroup({
			username: new FormControl('', Validators.required),
			password: new FormControl('', Validators.required),
			grant_type: new FormControl(''),
			client_id: new FormControl(''),
			client_secret: new FormControl(''),
			scope: new FormControl('')
		});
	}
	
	onSubmit() {
		this.store.dispatch(initLogin({ payload: this.form.value }));
		// this.form.reset();
	}
	
	ngOnDestroy() {
		this.subs.unsubscribe();
	}
}
