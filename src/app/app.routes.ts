import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CanvasShowcaseComponent } from './canvas-showcase/canvas-showcase.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.routes').then((m) => m.routes),
  },
  {
    path: 'password-generator',
    loadChildren: () =>
      import('./password-generator/password-generator.routes').then(
        (m) => m.routes,
      ),
  },
  {
    path: 'webcam',
    loadChildren: () => import('./webcam/webcam.routes').then((m) => m.routes),
  },
  { path: 'canvas', component: CanvasShowcaseComponent },
  {
    path: 'tfjs',
    loadChildren: () => import('./tfjs/tfjs.routes').then((m) => m.routes),
  },
  {
    path: 'crypto',
    loadChildren: () => import('./crypto/crypto.routes').then((m) => m.routes),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.routes').then((m) => m.routes),
  },
  {
    path: 'pomodoro',
    loadChildren: () =>
      import('./pomodoro/pomodoro.routes').then((m) => m.routes),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutes {}
