import { createAction, props } from '@ngrx/store';
import { UsersEntity } from './users.models';

export const initUsers = createAction('[Users Page] Init');

export const initGetUser = createAction(
	'[Users] Get User Init',
	props<{ username: string }>()
);

export const initDeleteUser = createAction(
	'[Users] Delete User Init',
	props<{ username: string }>()
);

export const loadUsersSuccess = createAction(
	'[Users] Load Users Success',
	props<{ users: UsersEntity[] }>()
);

export const getUserSuccess = createAction(
	'[Users] Get User Success',
	props<{ user: UsersEntity }>()
);

export const deleteUserSuccess = createAction('[Users] Delete User Success');
