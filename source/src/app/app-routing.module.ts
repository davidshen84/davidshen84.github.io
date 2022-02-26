import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CanvasShowcaseComponent } from './canvas-showcase/canvas-showcase.component';
import { PomodoroComponent } from './pomodoro/pomodoro.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'password-generator',
    loadChildren: () =>
      import('./password-generator/password-generator.module').then(
        (m) => m.PasswordGeneratorModule,
      ),
  },
  {
    path: 'webcam',
    loadChildren: () =>
      import('./webcam/webcam.module').then((m) => m.WebcamModule),
  },
  { path: 'canvas', component: CanvasShowcaseComponent },
  {
    path: 'tfjs',
    loadChildren: () => import('./tfjs/tfjs.module').then((m) => m.TfjsModule),
  },
  {
    path: 'crypto',
    loadChildren: () =>
      import('./crypto/crypto.module').then((m) => m.CryptoModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'pomodoro',
    component: PomodoroComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      relativeLinkResolution: 'legacy',
    }),
  ],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
