/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Post } from '../../models/post';
import { PostUpdate } from '../../models/post-update';

export interface UpdatePostPostsPostIdPut$Params {
  post_id: number;
      body: PostUpdate
}

export function updatePostPostsPostIdPut(http: HttpClient, rootUrl: string, params: UpdatePostPostsPostIdPut$Params, context?: HttpContext): Observable<StrictHttpResponse<Post>> {
  const rb = new RequestBuilder(rootUrl, updatePostPostsPostIdPut.PATH, 'put');
  if (params) {
    rb.path('post_id', params.post_id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Post>;
    })
  );
}

updatePostPostsPostIdPut.PATH = '/posts/{post_id}';
