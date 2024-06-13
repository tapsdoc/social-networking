/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PostWithVotes } from '../../models/post-with-votes';

export interface GetPostPostsPostIdGet$Params {
  post_id: number;
}

export function getPostPostsPostIdGet(http: HttpClient, rootUrl: string, params: GetPostPostsPostIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<PostWithVotes>> {
  const rb = new RequestBuilder(rootUrl, getPostPostsPostIdGet.PATH, 'get');
  if (params) {
    rb.path('post_id', params.post_id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PostWithVotes>;
    })
  );
}

getPostPostsPostIdGet.PATH = '/posts/{post_id}';
