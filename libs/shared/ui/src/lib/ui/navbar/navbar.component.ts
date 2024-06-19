import { Component, inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformServer } from '@angular/common';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AuthState, logoutSuccess, selectUser } from '@social-networking/auth';
import { JwtDecoderService } from '@social-networking/services';

@Component({
	selector: 'lib-navbar',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
	
	username!: string;
	isOpen = false;
	isNavbarOpen = false;
	isServer = false;
	isUser = signal(false);
	
	private subs!: Subscription;
	private store = inject(Store<AuthState>);
	private decoder = inject(JwtDecoderService);
	private platformId = inject(PLATFORM_ID);
	
	constructor() {
		this.isServer = isPlatformServer(this.platformId);
	}
	
	ngOnInit() {
		this.subs = this.store.select(selectUser)
			.subscribe({
				next: (user) => {
					if (user) {
						if (user.access_token) {
							this.username = this.decoder.decodeToken(user.access_token)?.sub;
							this.isUser.set(true)
						}
					} else {
						this.isUser.set(false);
					}
				}
			});
	}
	
	onLogout() {
		this.toggle();
		this.store.dispatch(logoutSuccess());
	}
	
	toggle() {
		this.isOpen = !this.isOpen;
		this.isNavbarOpen = false;
	}
	
	toggleNavbar() {
		this.isNavbarOpen = !this.isNavbarOpen;
		this.isOpen = false;
	}
	
	ngOnDestroy() {
		this.subs.unsubscribe();
	}
}