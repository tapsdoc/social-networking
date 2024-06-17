import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth.reducer';
import { initLogin } from '../store/auth.actions';
import { selectIsLoading, setIsLoading } from '@social-networking/shared-ui';
import { Subscription } from 'rxjs';

@Component({
	selector: 'lib-login',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterLink
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
	
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
		this.store.dispatch(initLogin({ payload: this.form.value }));
		this.form.reset();
	}
	
	private initForm() {
		this.form = new FormGroup({
			username: new FormControl('', Validators.required),
			password: new FormControl('', Validators.required),
			grant_type: new FormControl(''),
			client_id: new FormControl(''),
			client_secret: new FormControl(''),
			scope: new FormControl('')
		});
	}
	
	ngOnDestroy() {
		this.subs.unsubscribe();
	}
}
