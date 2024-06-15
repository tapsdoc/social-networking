import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from '@social-networking/shared-ui';
import { Store } from '@ngrx/store';
import { AuthState, initAutoLogin } from '@social-networking/auth';

@Component({
	standalone: true,
	imports: [RouterModule, NavbarComponent],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
	title = 'social-networking';
	
	private store = inject(Store<AuthState>);
	
	ngOnInit(): void {
		initFlowbite();
		// this.authService.autoLogin();
		this.store.dispatch(initAutoLogin());
	}
}