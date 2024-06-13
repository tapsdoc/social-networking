import { Route } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { authGuard } from '@social-networking/auth';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromPosts from './store/posts.reducer';
import { PostsEffects } from './store/posts.effects';

export const postsRoutes: Route[] = [
  {
    path: '',
    component: PostsComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./posts-list/posts-list.component').then(
            (m) => m.PostsListComponent
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./create-post/create-post.component').then(
            (m) => m.CreatePostComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./post-detail/post-detail.component').then(
            (m) => m.PostDetailComponent
          ),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./create-post/create-post.component').then(
            (m) => m.CreatePostComponent
          ),
      },
    ],
    providers: [
      provideState(fromPosts.POSTS_FEATURE_KEY, fromPosts.postsReducer),
      provideEffects(PostsEffects),
    ],
  },
];
