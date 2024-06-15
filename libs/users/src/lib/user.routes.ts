import { Route } from '@angular/router';
import { UsersComponent } from '@social-networking/users';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromUsers from './store/users.reducer';
import { UsersEffects } from './store/users.effects';
import { authGuard } from '@social-networking/auth';

export const userRoutes: Route[] = [
	{
		path: '',
		component: UsersComponent,
		canActivate: [authGuard],
		providers: [
			provideState(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer),
			provideEffects(UsersEffects)
		]
	}
];
