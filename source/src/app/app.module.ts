import {LayoutModule} from '@angular/cdk/layout';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ServiceWorkerModule} from '@angular/service-worker';
import {QRCodeModule} from 'angularx-qrcode';

import {MarkdownModule} from 'ngx-markdown';
import {environment} from '../environments/environment';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {BlogModule} from './blog/blog.module';
import {CanvasShowcaseComponent} from './canvas-showcase/canvas-showcase.component';
import {CryptoModule} from './crypto/crypto.module';
import {FooterComponent} from './footer/footer.component';
import {HomePageComponent} from './home-page/home-page.component';
import {MaterialModules} from './material.modules';

import {NavComponent} from './nav/nav.component';
import {SettingsModule} from './settings/settings.module';


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
    MarkdownModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    QRCodeModule,
    CryptoModule,
    BlogModule,
    SettingsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
