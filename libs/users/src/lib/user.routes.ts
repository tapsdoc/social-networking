import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromUsers from './store/users.reducer';
import { UsersEffects } from './store/users.effects';
import { authGuard } from '@social-networking/auth';
import { UsersComponent } from './users/users.component';

export const userRoutes: Route[] = [
	{
		path: '',
		component: UsersComponent,
		canActivate: [],
		children: [
			{
				path: '',
				loadComponent: () =>
					import('./users-list/users-list.component').then(
						m => m.UsersListComponent
					)
			}
		],
		providers: [
			provideState(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer),
			provideEffects(UsersEffects)
		]
	}
];
