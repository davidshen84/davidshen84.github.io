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
import {FooterComponent} from './footer/footer.component';
import {QRCodeModule} from 'angularx-qrcode';
import {CanvasShowcaseComponent} from './canvas-showcase/canvas-showcase.component';
import {CryptoModule} from './crypto/crypto.module';
import {BlogModule} from './blog/blog.module';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomePageComponent,
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
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    QRCodeModule,
    CryptoModule,
    BlogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
