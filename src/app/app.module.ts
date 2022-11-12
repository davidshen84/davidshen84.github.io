import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModules } from './material.modules';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';

import { NgxWebstorageModule } from 'ngx-webstorage';
import { QRCodeModule } from 'angularx-qrcode';

import { AppComponent } from './app.component';
import { CanvasShowcaseComponent } from './canvas-showcase/canvas-showcase.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavComponent } from './nav/nav.component';

import { AppRoutingModule } from './app-routing.module';
import { BlogModule } from './blog/blog.module';
import { CryptoModule } from './crypto/crypto.module';
import { PomodoroModule } from './pomodoro/pomodoro.module';
import { SettingsModule } from './settings/settings.module';

import { AuthorizationInterceptorService } from './services/authorization-interceptor.service';
import { RS256CryptoService } from './crypto/rs256-crypto.service';
import { RemarkableModule } from './remarkable/remarkable.module';

@NgModule({
  declarations: [
    AppComponent,
    CanvasShowcaseComponent,
    FooterComponent,
    HomePageComponent,
    NavComponent,
  ],
  imports: [
    AppRoutingModule,
    BlogModule,
    BrowserAnimationsModule,
    BrowserModule,
    CryptoModule,
    HammerModule,
    HttpClientModule,
    LayoutModule,
    MaterialModules,
    NgxWebstorageModule.forRoot(),
    PomodoroModule,
    QRCodeModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
    SettingsModule,
    RemarkableModule,
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