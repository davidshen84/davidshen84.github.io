import { LayoutModule } from '@angular/cdk/layout';
import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ServiceWorkerModule } from '@angular/service-worker';
import { QRCodeModule } from 'angularx-qrcode';

import { MarkdownModule } from 'ngx-markdown';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BlogModule } from './blog/blog.module';
import { CanvasShowcaseComponent } from './canvas-showcase/canvas-showcase.component';
import { CryptoModule } from './crypto/crypto.module';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MarkdownEditorModule } from './markdown-editor/markdown-editor.module';
import { MaterialModules } from './material.modules';

import { NavComponent } from './nav/nav.component';
import { SettingsModule } from './settings/settings.module';
import { MathJaxModule } from 'ngx-mathjax';
import { RS256CryptoService } from './crypto/rs256-crypto.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthorizationInterceptorService } from './services/authorization-interceptor.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import {
  PomodoroComponent,
  PomodoroTimePipe,
} from './pomodoro/pomodoro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomePageComponent,
    FooterComponent,
    CanvasShowcaseComponent,
    PomodoroComponent,
    PomodoroTimePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    MaterialModules,
    NgxWebstorageModule.forRoot(),
    AppRoutingModule,
    MathJaxModule.forRoot(),
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE,
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
    QRCodeModule,
    CryptoModule,
    BlogModule,
    SettingsModule,
    MarkdownEditorModule,
    HammerModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatGridListModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptorService,
      multi: true,
    },
    RS256CryptoService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
