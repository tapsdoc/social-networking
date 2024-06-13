import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	AbstractControl,
	FormControl,
	FormGroup, ReactiveFormsModule,
	ValidatorFn,
	Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@social-networking/services';
import { LoadingComponent, SnackBarComponent } from '@social-networking/shared-ui';

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
export class SignUpComponent implements OnInit {
	
	form!: FormGroup;
	loading = false;
	message = '';
	type = '';
	
	constructor(
		private authService: AuthService,
		private router: Router
	) {
	}
	
	ngOnInit() {
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
	
	onSubmit() {
		this.loading = true;
		this.authService.registerUserAuthRegisterPost({ body: this.form.value })
			.subscribe({
				next: () => {
					this.form.reset();
					this.router.navigate(['/login']).then();
				},
				error: (err)=> {
					this.type = 'error'
					
					if(err.statusText === 'Unknown Error') {
						this.message = 'An error occurred!'
					} else this.message = err.error?.detail;
				},
		});
		this.type = '';
		this.message = '';
		this.loading = false;
	}
	
	passwordMatchValidator(form: FormGroup) {
		const password = form.get('password') as AbstractControl;
		const confirmPassword = form.get('confirmPassword') as AbstractControl;
		
		if (password && confirmPassword && password.value !== confirmPassword.value) {
			confirmPassword.setErrors({ mismatch: true });
		} else {
			confirmPassword.setErrors(null);
		}
	}
}
