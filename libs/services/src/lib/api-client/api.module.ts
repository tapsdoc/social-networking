/* tslint:disable */
/* eslint-disable */
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { PostsService } from './services/posts.service';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';
import { HttpClient } from '@angular/common/http';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AuthService,
    UsersService,
    PostsService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor(
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
