import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { exhaustMap, map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from './store/auth.reducer';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const store = inject(Store<AuthState>);
	return store.select('auth').pipe(
		take(1),
		map((state) => {
			return state.user
		}),
		exhaustMap(user => {
			if (!user) {
				return next(req);
			}
			const request = req.clone({
				setHeaders: { Authorization: `Bearer ${user.access_token}` }
			});
			return next(request);
		})
	);
};
