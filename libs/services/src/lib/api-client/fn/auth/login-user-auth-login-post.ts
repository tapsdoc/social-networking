/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { BodyLoginUserAuthLoginPost } from '@social-networking/services';

export interface LoginUserAuthLoginPost$Params {
	body: BodyLoginUserAuthLoginPost;
}

export function loginUserAuthLoginPost(http: HttpClient, rootUrl: string, params: LoginUserAuthLoginPost$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
	const rb = new RequestBuilder(rootUrl, loginUserAuthLoginPost.PATH, 'post');
	if (params) {
		rb.body(params.body, 'application/x-www-form-urlencoded');
	}
	
	return http.request(
		rb.build({ responseType: 'json', accept: 'application/json', context })
	).pipe(
		filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
		map((r: HttpResponse<any>) => {
			return r as StrictHttpResponse<any>;
		})
	);
}

loginUserAuthLoginPost.PATH = '/auth/login';
