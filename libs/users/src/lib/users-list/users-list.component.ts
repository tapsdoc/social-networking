import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { UsersEntity } from '../store/users.models';
import { UsersState } from '../store/users.reducer';
import { initDeleteUser, initUsers } from '../store/users.actions';
import { selectAllUsers } from '../store/users.selectors';
import { setIsLoading } from '@social-networking/shared-ui';
import { PaginationComponent } from '../components/pagination/pagination.component';

@Component({
	selector: 'lib-users-list',
	standalone: true,
	imports: [CommonModule, PaginationComponent],
	templateUrl: './users-list.component.html',
	styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
	
	users$!: Observable<UsersEntity[]>;
	pageSize = 10;
	totalElements = 0;
	@ViewChild('dropdown', { static: true }) private elementRef!: ElementRef;
	
	constructor(private store: Store<UsersState>) {
		this.store.dispatch(initUsers());
	}
	
	ngOnInit() {
		this.users$ = this.store.select(selectAllUsers);
		this.store.select(selectAllUsers)
			.subscribe(users => {
				if (users)
					this.totalElements = users.length;
			});
	}

	
	onDelete(username: string) {
		this.store.dispatch(setIsLoading({status: true}));
		this.store.dispatch(initDeleteUser({username: username}));
		this.elementRef.nativeElement.classList.replace('block', 'hidden');
	}
}
