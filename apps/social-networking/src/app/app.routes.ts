import { Route } from '@angular/router';

export const appRoutes: Route[] = [
	{ path: '', redirectTo: '/posts', pathMatch: 'full' },
	{
		path: '',
		loadChildren: () =>
			import('@social-networking/auth').then(m => m.authRoutes)
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
	}
];
