import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { WebStorageModule } from 'ngx-store';
import { MaterialModules } from '../material.modules';
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
    MaterialModules,
    MarkdownModule.forChild(),
    BlogRoutingModule,
    WebStorageModule,
  ],
})
export class BlogModule {}
