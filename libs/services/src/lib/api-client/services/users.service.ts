/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createUserUsersPost } from '../fn/users/create-user-users-post';
import { CreateUserUsersPost$Params } from '../fn/users/create-user-users-post';
import { deleteUserUsersUsernameDelete } from '../fn/users/delete-user-users-username-delete';
import { DeleteUserUsersUsernameDelete$Params } from '../fn/users/delete-user-users-username-delete';
import { getAllUsersUsersGet } from '../fn/users/get-all-users-users-get';
import { GetAllUsersUsersGet$Params } from '../fn/users/get-all-users-users-get';
import { getUserUsersUsernameGet } from '../fn/users/get-user-users-username-get';
import { GetUserUsersUsernameGet$Params } from '../fn/users/get-user-users-username-get';
import { updateUserUsersUsernamePut } from '../fn/users/update-user-users-username-put';
import { UpdateUserUsersUsernamePut$Params } from '../fn/users/update-user-users-username-put';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllUsersUsersGet()` */
  static readonly GetAllUsersUsersGetPath = '/users';

  /**
   * Get all users.
   *
   * Get all Postify users.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsersUsersGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsersUsersGet$Response(params?: GetAllUsersUsersGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<User>>> {
    return getAllUsersUsersGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all users.
   *
   * Get all Postify users.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUsersUsersGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsersUsersGet(params?: GetAllUsersUsersGet$Params, context?: HttpContext): Observable<Array<User>> {
    return this.getAllUsersUsersGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<User>>): Array<User> => r.body)
    );
  }

  /** Path part for operation `createUserUsersPost()` */
  static readonly CreateUserUsersPostPath = '/users';

  /**
   * Create a new user.
   *
   * Create a new user with the provided username, email, and password.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUserUsersPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUserUsersPost$Response(params: CreateUserUsersPost$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return createUserUsersPost(this.http, this.rootUrl, params, context);
  }

  /**
   * Create a new user.
   *
   * Create a new user with the provided username, email, and password.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createUserUsersPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUserUsersPost(params: CreateUserUsersPost$Params, context?: HttpContext): Observable<User> {
    return this.createUserUsersPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getUserUsersUsernameGet()` */
  static readonly GetUserUsersUsernameGetPath = '/users/{username}';

  /**
   * Get a user.
   *
   * Get a user by their username.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserUsersUsernameGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserUsersUsernameGet$Response(params: GetUserUsersUsernameGet$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return getUserUsersUsernameGet(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a user.
   *
   * Get a user by their username.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserUsersUsernameGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserUsersUsernameGet(params: GetUserUsersUsernameGet$Params, context?: HttpContext): Observable<User> {
    return this.getUserUsersUsernameGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `updateUserUsersUsernamePut()` */
  static readonly UpdateUserUsersUsernamePutPath = '/users/{username}';

  /**
   * Update a user.
   *
   * Update a user by their username. Provide the fields required.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserUsersUsernamePut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserUsersUsernamePut$Response(params: UpdateUserUsersUsernamePut$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return updateUserUsersUsernamePut(this.http, this.rootUrl, params, context);
  }

  /**
   * Update a user.
   *
   * Update a user by their username. Provide the fields required.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUserUsersUsernamePut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserUsersUsernamePut(params: UpdateUserUsersUsernamePut$Params, context?: HttpContext): Observable<User> {
    return this.updateUserUsersUsernamePut$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `deleteUserUsersUsernameDelete()` */
  static readonly DeleteUserUsersUsernameDeletePath = '/users/{username}';

  /**
   * Delete a user.
   *
   * Delete a user by their username.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUserUsersUsernameDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUserUsersUsernameDelete$Response(params: DeleteUserUsersUsernameDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteUserUsersUsernameDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete a user.
   *
   * Delete a user by their username.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUserUsersUsernameDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUserUsersUsernameDelete(params: DeleteUserUsersUsernameDelete$Params, context?: HttpContext): Observable<void> {
    return this.deleteUserUsersUsernameDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
