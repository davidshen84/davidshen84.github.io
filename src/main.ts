import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import {
  provideNgxWebstorage,
  withLocalStorage,
  withNgxWebstorageConfig,
  withSessionStorage,
} from 'ngx-webstorage';
import { LayoutModule } from '@angular/cdk/layout';
import {
  bootstrapApplication,
  BrowserModule,
  HammerModule,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { RS256CryptoService } from './app/crypto/rs256-crypto.service';
import { AuthorizationInterceptorService } from './app/services/authorization-interceptor.service';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import 'hammerjs';
import { provideRouter, withHashLocation } from '@angular/router';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withHashLocation()),
    importProvidersFrom(
      BrowserModule,
      HammerModule,
      LayoutModule,
      QRCodeModule,
      ReactiveFormsModule,
      ServiceWorkerModule.register('/ngsw-worker.js', {
        enabled: environment.production,
      }),
      MatSidenavModule,
      MatToolbarModule,
      MatListModule,
      MatIconModule,
      MatButtonModule,
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptorService,
      multi: true,
    },
    RS256CryptoService,
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideNgxWebstorage(
      withNgxWebstorageConfig({ separator: ':', caseSensitive: true }),
      withLocalStorage(),
      withSessionStorage(),
    ),
  ],
}).catch((err) => console.log(err));
