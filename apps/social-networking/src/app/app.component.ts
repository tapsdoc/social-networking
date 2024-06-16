import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { NavbarComponent } from '@social-networking/shared-ui';
import { Store } from '@ngrx/store';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AuthState, initAutoLogin } from '@social-networking/auth';
import { AuthService } from '@social-networking/services';

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
	private authService = inject(AuthService);
	
	ngOnInit(): void {
		initFlowbite();
		this.store.dispatch(initAutoLogin());
		//this.authService.autoLogin();
	}
}