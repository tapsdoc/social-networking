import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-not-found',
  standalone: true,
	imports: [CommonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
	
	constructor(private router: Router,) { }
	
	onNavigate() {
		this.router.navigate(['/posts']).then();
	}
}
