import { Route } from '@angular/router';
export const appRoutes: Route[] = [
	{ path: '', redirectTo: '/posts', pathMatch: 'full' },
	{
		path: 'login',
		loadComponent: () =>
			import('@social-networking/auth').then((m) => m.LoginComponent),
	},
	{
		path: 'sign-up',
		loadComponent: () =>
			import('@social-networking/auth').then((m) => m.SignUpComponent)
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
		loadChildren: () =>
			import('@social-networking/shared-ui').then((m) => m.NotFoundComponent)
	},
];
