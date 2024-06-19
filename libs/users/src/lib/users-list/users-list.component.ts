import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { UsersEntity } from '../store/users.models';
import { UsersState } from '../store/users.reducer';
import { initDeleteUser, initUsers } from '../store/users.actions';
import { selectAllUsers } from '../store/users.selectors';
import { setIsLoading } from '@social-networking/shared-ui';

@Component({
	selector: 'lib-users-list',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './users-list.component.html',
	styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
	
	users$!: Observable<UsersEntity[]>;
	
	constructor(private store: Store<UsersState>) {
		this.store.dispatch(initUsers());
	}
	
	ngOnInit() {
		this.users$ = this.store.select(selectAllUsers);
	}
	
	onDelete(username: string) {
		this.store.dispatch(setIsLoading({ status: true }));
		this.store.dispatch(initDeleteUser({ username: username }));
	}
}
