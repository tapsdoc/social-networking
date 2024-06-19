import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
	NavbarComponent,
	selectError,
	SharedState,
	SnackBarComponent
} from '@social-networking/shared-ui';
import { Store } from '@ngrx/store';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
	standalone: true,
	imports: [
		RouterModule,
		NavbarComponent,
		CommonModule,
		SnackBarComponent
	],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
	
	title = 'social-networking';
	error$!: Observable<string>;
	
	private store = inject(Store<SharedState>);
	private platformId = inject(PLATFORM_ID);
	
	ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			initFlowbite();
			this.error$ = this.store.select(selectError) as Observable<string>;
		}
	}
}