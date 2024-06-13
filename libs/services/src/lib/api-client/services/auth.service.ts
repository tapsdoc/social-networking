/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AuthState, loginSuccess, logoutSuccess } from '@social-networking/auth';
import { Router } from '@angular/router';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { RegisterUserAuthRegisterPost$Params, registerUserAuthRegisterPost } from '../fn/auth/register-user-auth-register-post';
import { StrictHttpResponse } from '../strict-http-response';
import { User } from '../models/user';
import { loginUserAuthLoginPost, LoginUserAuthLoginPost$Params } from '../fn/auth/login-user-auth-login-post';
import { HttpValidationError } from '../models/http-validation-error';
import { JwtDecoderService } from './jwt-decoder.service';
import { AuthResponse } from '../models/auth-response';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
	
	constructor(
		config: ApiConfiguration,
		http: HttpClient,
		private store: Store<AuthState>,
		private router: Router,
		private decoder: JwtDecoderService
	) {
		super(config, http);
	}
	
	/** Path part for operation `registerUserAuthRegisterPost()` */
	static readonly RegisterUserAuthRegisterPostPath = '/auth/register';
	
	/**
	 * Register a new user.
	 *
	 * Register a new user. Provide a username, email, and password.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `registerUserAuthRegisterPost()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	registerUserAuthRegisterPost$Response(params: RegisterUserAuthRegisterPost$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
		return registerUserAuthRegisterPost(this.http, this.rootUrl, params, context);
	}
	
	/**
	 * Register a new user.
	 *
	 * Register a new user. Provide a username, email, and password.
	 *
	 * This method provides access only to the response body.
	 * To access the full response (for headers, for example), `registerUserAuthRegisterPost$Response()` instead.
	 *
	 * This method sends `application/json` and handles request body of type `application/json`.
	 */
	registerUserAuthRegisterPost(params: RegisterUserAuthRegisterPost$Params, context?: HttpContext): Observable<User> {
		return this.registerUserAuthRegisterPost$Response(params, context).pipe(
			map((r: StrictHttpResponse<User>): User => r.body)
		);
	}
	
	/** Path part for operation `loginUserAuthLoginPost()` */
	static readonly LoginUserAuthLoginPostPath = '/auth/login';
	
	/**
	 * Login a user.
	 *
	 * Login a user. Provide a username and password.
	 *
	 * This method provides access to the full `HttpResponse`, allowing access to response headers.
	 * To access only the response body, use `loginUserAuthLoginPost()` instead.
	 *
	 * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
	 */
	loginUserAuthLoginPost$Response(params: LoginUserAuthLoginPost$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthResponse | HttpValidationError>> {
		return loginUserAuthLoginPost(this.http, this.rootUrl, params, context);
	}
	
	/**
	 * Login a user.
	 *
	 * Login a user. Provide a username and password.
	 *
	 * This method provides access only to the response body.
	 * To access the full response (for headers, for example), `loginUserAuthLoginPost$Response()` instead.
	 *
	 * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
	 */
	loginUserAuthLoginPost(params: LoginUserAuthLoginPost$Params, context?: HttpContext): Observable<AuthResponse | HttpValidationError> {
		return this.loginUserAuthLoginPost$Response(params, context).pipe(
			take(1),
			// tap(res => {
			// 	this.router.navigate(['/posts']).then();
			// 	localStorage.setItem('user', JSON.stringify(res.body));
			//
			// 	const { access_token } = res.body as AuthResponse;
			//
			// 	const now = new Date().getTime() / 1000;
			// 	const unixTimestamp: number = this.decoder.decodeToken(access_token)?.exp
			// 	if (now > unixTimestamp) {
			// 		this.logout();
			// 		return;
			// 	}
			//
			// 	// this.store.dispatch(loginSuccess({ payload: res.body as AuthResponse }));
			// }),
			map((r: StrictHttpResponse<AuthResponse | HttpValidationError>): AuthResponse | HttpValidationError => r.body)
		);
	}
	
	autoLogin() {
		const user: AuthResponse = JSON.parse(localStorage.getItem("user") as string);
		if (!user) {
			return;
		}
		if (user.access_token) {
			this.store.dispatch(loginSuccess({ payload: user }))
			this.router.navigate(['/posts']).then();
			const now = new Date().getTime() / 1000;
			const unixTimestamp: number = this.decoder.decodeToken(user.access_token)?.exp
			
			if (now > unixTimestamp) {
				this.logout();
				return;
			}
		}
	}
	
	logout() {
		this.store.dispatch(logoutSuccess());
		this.router.navigate(['/login']).then();
		localStorage.removeItem('user');
	}
	
}
