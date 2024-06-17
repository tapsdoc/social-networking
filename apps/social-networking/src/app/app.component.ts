import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { NavbarComponent, selectError, SnackBarComponent } from '@social-networking/shared-ui';
import { Store } from '@ngrx/store';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AuthState } from '@social-networking/auth';
import { CommonModule } from '@angular/common';
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
	
	private store = inject(Store<AuthState>);
	
	ngOnInit(): void {
		initFlowbite();
		this.error$ = this.store.select(selectError) as Observable<string>;
	}
}