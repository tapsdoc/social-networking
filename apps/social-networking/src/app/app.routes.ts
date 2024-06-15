import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
// eslint-disable-next-line @nx/enforce-module-boundaries
import * as fromAuth from '@social-networking/auth';
import { provideEffects } from '@ngrx/effects';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AuthEffects } from '@social-networking/auth';

export const appRoutes: Route[] = [
	{ path: '', redirectTo: '/posts', pathMatch: 'full' },
	{ path: 'login',
		loadComponent: () =>
			import('@social-networking/auth').then((m) => m.LoginComponent),
		providers: [
			provideState(fromAuth.AUTH_FEATURE_KEY, fromAuth.authReducer),
			provideEffects(AuthEffects)
		]
	},
	{ path: 'sign-up',
		loadComponent: () =>
			import('@social-networking/auth').then((m) => m.LoginComponent),
		providers: [
			provideState(fromAuth.AUTH_FEATURE_KEY, fromAuth.authReducer),
			provideEffects(AuthEffects)
		]
	},
	{
		path: 'posts',
		loadChildren: () =>
			import('@social-networking/posts').then(m => m.postsRoutes)
	},
	{
		path: 'users',
		loadChildren: () =>
			import('@social-networking/users').then(m => m.userRoutes)
	},
	{
		path: '**',
		loadComponent: () =>
			import('@social-networking/shared-ui').then((m) => m.NotFoundComponent)
	},
];
