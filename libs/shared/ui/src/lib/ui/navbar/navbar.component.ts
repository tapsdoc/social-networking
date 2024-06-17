import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
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
	isLoggedIn = false;
	isOpen = false;
	private subs!: Subscription;
	private store = inject(Store<AuthState>);
	private decoder = inject(JwtDecoderService);
	
	ngOnInit() {
		this.subs = this.store.select(selectUser)
			.subscribe({
				next: (user) => {
					if (user) {
						this.isLoggedIn = !!user;
						if (user.access_token)
							this.username = this.decoder.decodeToken(user.access_token)?.sub;
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
	}
	
	ngOnDestroy() {
		this.subs.unsubscribe();
	}
}
