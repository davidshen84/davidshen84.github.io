import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BlogRoutingModule} from './blog-routing.module';
import {BlogHomePageComponent} from './blog-home-page/blog-home-page.component';
import {BlogPageComponent} from './blog-page/blog-page.component';
import {BlogPageNotFoundComponent} from './blog-page-not-found/blog-page-not-found.component';
import {GaeBlogHomePageComponent} from './gae-blog-home-page/gae-blog-home-page.component';
import {GaeBlogPageComponent} from './gae-blog-page/gae-blog-page.component';
import {MaterialModules} from '../material.modules';
import {MarkdownModule} from 'ngx-markdown';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthorizationInterceptor} from './authorization-interceptor';


@NgModule({
  declarations: [
    BlogHomePageComponent,
    BlogPageComponent,
    BlogPageNotFoundComponent,
    GaeBlogHomePageComponent,
    GaeBlogPageComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModules,
    MarkdownModule.forChild(),
    BlogRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    },
  ]
})
export class BlogModule {
}
