import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../components/layout/layout.component';

@Component({
  selector: 'lib-users',
  standalone: true,
	imports: [CommonModule, RouterModule, LayoutComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {}
