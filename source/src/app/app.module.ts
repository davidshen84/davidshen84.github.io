import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MaterialModules} from './material.modules';

import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

import {MarkdownModule} from 'ngx-markdown';

import {NavComponent} from './nav/nav.component';
import {HomePageComponent} from './home-page/home-page.component';
import {BlogPageComponent} from './blog-page/blog-page.component';
import {BlogPageNotFoundComponent} from './blog-page-not-found/blog-page-not-found.component';
import {BlogHomePageComponent} from './blog-home-page/blog-home-page.component';
import {FooterComponent} from './footer/footer.component';
import {GaeBlogHomePageComponent} from './gae-blog-home-page/gae-blog-home-page.component';
import {GaeBlogPageComponent} from './gae-blog-page/gae-blog-page.component';
import {QRCodeModule} from 'angularx-qrcode';
import {CanvasShowcaseComponent} from './canvas-showcase/canvas-showcase.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomePageComponent,
    BlogPageComponent,
    BlogPageNotFoundComponent,
    BlogHomePageComponent,
    GaeBlogHomePageComponent,
    GaeBlogPageComponent,
    FooterComponent,
    CanvasShowcaseComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModules,
    AppRoutingModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    QRCodeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
