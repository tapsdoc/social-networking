import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import {
	provideRouter,
	withEnabledBlockingInitialNavigation
} from '@angular/router';
import { appRoutes } from './app.routes';
import {
	provideHttpClient,
	withFetch,
	withInterceptors
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromAuth from '@social-networking/auth';
import * as fromPosts from '@social-networking/posts';
import * as fromUsers from '@social-networking/users';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';

export const appConfig: ApplicationConfig = {
	providers: [
		provideEffects(),
		provideStore({
			[fromAuth.AUTH_FEATURE_KEY]: fromAuth.authReducer,
			[fromPosts.POSTS_FEATURE_KEY]: fromPosts.postsReducer,
			[fromUsers.USERS_FEATURE_KEY]: fromUsers.usersReducer,
		}),
		provideRouterStore(),
		provideStoreDevtools({
			maxAge: 25, // Retains last 25 states
			logOnly: !isDevMode(), // Restrict extension to log-only mode
			autoPause: true, // Pauses recording actions and state changes when the extension window is not open
			trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
			traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
			connectInZone: true // If set to true, the connection is established within the Angular zone
		}),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideAnimationsAsync(),
		provideHttpClient(withFetch(), withInterceptors([fromAuth.authInterceptor])),
		provideRouter(appRoutes, withEnabledBlockingInitialNavigation())
	]
};
