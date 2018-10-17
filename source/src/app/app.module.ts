import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MaterialModules} from './material.modules';

import {RoutingModule} from './routing/routing.module';
import {HttpClientModule} from '@angular/common/http';

import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';

import {MarkdownModule} from 'ngx-markdown';
import {ClipboardModule} from 'ngx-clipboard';

import {NavComponent} from './nav/nav.component';
import {HomePageComponent} from './home-page/home-page.component';
import {BlogPageComponent} from './blog-page/blog-page.component';
import {BlogPageNotFoundComponent} from './blog-page-not-found/blog-page-not-found.component';
import {BlogHomePageComponent} from './blog-home-page/blog-home-page.component';
import {PasswordGeneratorComponent} from './password-generator/password-generator.component';
import {FooterComponent} from './footer/footer.component';
import {GaeBlogHomePageComponent} from './gae-blog-home-page/gae-blog-home-page.component';
import {GaeBlogPageComponent} from './gae-blog-page/gae-blog-page.component';


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
    PasswordGeneratorComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    LayoutModule,
    MaterialModules,
    RoutingModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    ClipboardModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
