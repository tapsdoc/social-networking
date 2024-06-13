/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface DownvotePostPostsPostIdDownvotePut$Params {
  post_id: number;
}

export function downvotePostPostsPostIdDownvotePut(http: HttpClient, rootUrl: string, params: DownvotePostPostsPostIdDownvotePut$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, downvotePostPostsPostIdDownvotePut.PATH, 'put');
  if (params) {
    rb.path('post_id', params.post_id, {});
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

downvotePostPostsPostIdDownvotePut.PATH = '/posts/{post_id}/downvote';
