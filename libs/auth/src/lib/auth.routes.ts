import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromAuth from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';

export const authRoutes: Route[] = [
	{
		path: '',
		children: [
			{
				path: 'login',
				loadComponent: () =>
					import('./login/login.component').then((m) => m.LoginComponent)
			},
			{
				path: 'sign-up',
				loadComponent: () =>
					import('./sign-up/sign-up.component').then((m) => m.SignUpComponent)
			}
		],
		providers: [
			provideState(fromAuth.AUTH_FEATURE_KEY, fromAuth.authReducer),
			provideEffects(AuthEffects)
		]
	}
];
