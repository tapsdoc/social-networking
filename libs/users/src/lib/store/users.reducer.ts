import { createReducer, on, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { UsersEntity } from './users.models';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
	users: UsersEntity[];
	user?: UsersEntity;
	selectedId?: string; // which Users record has been selected
	loaded: boolean; // has the Users list been loaded
}

export interface UsersPartialState {
	readonly [USERS_FEATURE_KEY]: UsersState;
}

export const initialUsersState: UsersState = {
	users: [],
	loaded: false
}

const reducer = createReducer(
	initialUsersState,
	on(UsersActions.initUsers, (state) => ({
		...state,
		loaded: false
	})),
	on(UsersActions.initDeleteUser, (state, { username }) => ({
		...state,
		selectedId: username
	})),
	on(UsersActions.initGetUser, (state, { username }) => ({
		...state,
		selectedId: username
	})),
	on(UsersActions.loadUsersSuccess, (state, { users }) => ({
		...state,
		users: users,
		loaded: true
	})),
	on(UsersActions.getUserSuccess, (state, { user }) => ({
		...state,
		user: user,
		loaded: true,
		selectedId: undefined
	})),
	on(UsersActions.deleteUserSuccess, (state) => {
		const users: UsersEntity[] = state.users.filter(user => user.username !== state.selectedId);
		return {
			...state,
			users: users,
			selectedId: undefined
		}
	}),
);

export function usersReducer(state: UsersState | undefined, action: Action) {
	return reducer(state, action);
}