import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from '@social-networking/shared-ui';
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
	
	constructor(private authService: AuthService) { }
	
	ngOnInit(): void {
		initFlowbite();
		this.authService.autoLogin();
	}
}