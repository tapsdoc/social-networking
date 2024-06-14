import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	AbstractControl,
	FormControl,
	FormGroup, ReactiveFormsModule,
	ValidatorFn,
	Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { LoadingComponent, SnackBarComponent } from '@social-networking/shared-ui';
import { selectAuthState } from '../store/auth.selectors';
import { map, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth.reducer';
import { initSignup } from '../store/auth.actions';

@Component({
	selector: 'lib-sign-up',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterLink,
		SnackBarComponent,
		LoadingComponent
	],
	templateUrl: './sign-up.component.html',
	styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit, OnDestroy {
	
	form!: FormGroup;
	isLoading = false;
	error!: string | null;
	type!: string | null;
	private subs!: Subscription;
	
	constructor(private store: Store<AuthState>) { }
	
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
		this.initForm();
	}
	
	onSubmit() {
		this.store.dispatch(initSignup({ payload: this.form.value }));
	}
	
	private passwordMatchValidator(form: FormGroup) {
		const password = form.get('password') as AbstractControl;
		const confirmPassword = form.get('confirmPassword') as AbstractControl;
		
		if (password && confirmPassword && password.value !== confirmPassword.value) {
			confirmPassword.setErrors({ mismatch: true });
		} else {
			confirmPassword.setErrors(null);
		}
	}
	
	private initForm() {
		this.form = new FormGroup({
			username: new FormControl(
				'', [
					Validators.required,
					Validators.minLength(4)
				]
			),
			email: new FormControl(
				'', [
					Validators.required,
					Validators.email
				]),
			password: new FormControl(
				'', [
					Validators.required,
					Validators.minLength(8),
					Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
				]
			),
			confirmPassword: new FormControl('', Validators.required),
			confirm: new FormControl(false, [Validators.requiredTrue])
		}, { validators: this.passwordMatchValidator as ValidatorFn });
	}
	
	ngOnDestroy() {
		this.subs.unsubscribe();
	}
}
