import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { WebStorageModule } from 'ngx-store';
import { RS256CryptoService } from '../crypto/rs256-crypto.service';
import { MaterialModules } from '../material.modules';
import { AuthorizationInterceptorService } from './authorization-interceptor.service';
import { BlogHomePageComponent } from './blog-home-page/blog-home-page.component';
import { BlogPageNotFoundComponent } from './blog-page-not-found/blog-page-not-found.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogRoutingModule } from './blog-routing.module';

@NgModule({
  declarations: [
    BlogHomePageComponent,
    BlogPageComponent,
    BlogPageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModules,
    MarkdownModule.forChild(),
    BlogRoutingModule,
    WebStorageModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptorService,
      multi: true,
    },
    RS256CryptoService,
  ],
})
export class BlogModule {}
