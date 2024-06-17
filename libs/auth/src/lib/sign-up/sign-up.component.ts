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
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth.reducer';
import { initSignup } from '../store/auth.actions';
import { selectIsLoading, setIsLoading } from '@social-networking/shared-ui';

@Component({
	selector: 'lib-sign-up',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterLink,
	],
	templateUrl: './sign-up.component.html',
	styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit, OnDestroy {
	
	form!: FormGroup;
	isLoading = false;
	private subs!: Subscription;
	
	constructor(private store: Store<AuthState>) { }
	
	ngOnInit() {
		this.subs = this.store.select(selectIsLoading).subscribe(
			isLoading => {
				this.isLoading = isLoading;
			}
		);
		this.initForm();
	}
	
	onSubmit() {
		this.store.dispatch(setIsLoading({ status: true }));
		this.store.dispatch(initSignup({ payload: this.form.value }));
		this.form.reset();
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
