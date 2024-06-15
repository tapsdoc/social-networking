/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { RegisterUserAuthRegisterPost$Params, registerUserAuthRegisterPost } from '../fn/auth/register-user-auth-register-post';
import { StrictHttpResponse } from '../strict-http-response';
import { User } from '../models/user';
import { loginUserAuthLoginPost, LoginUserAuthLoginPost$Params } from '../fn/auth/login-user-auth-login-post';
import { HttpValidationError } from '../models/http-validation-error';
import { AuthResponse } from '../models/auth-response';
import { AuthState, logoutSuccess } from '@social-networking/auth';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
	
	constructor(
		config: ApiConfiguration,
		http: HttpClient,
		private store: Store<AuthState>,
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
			map((r: StrictHttpResponse<AuthResponse | HttpValidationError>): AuthResponse | HttpValidationError => r.body)
		);
	}
	
	logout() {
		this.store.dispatch(logoutSuccess());
	}
}
