import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {CanvasShowcaseComponent} from './canvas-showcase/canvas-showcase.component';


export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'blog', loadChildren: './blog/blog.module#BlogModule'},
  {path: 'password-generator', loadChildren: './password-generator/password-generator.module#PasswordGeneratorModule'},
  {path: 'webcam', loadChildren: './webcam/webcam.module#WebcamModule'},
  {path: 'canvas', component: CanvasShowcaseComponent},
  {path: 'tfjs', loadChildren: './tfjs/tfjs.module#TfjsModule'},
  {path: 'crypto', loadChildren: './crypto/crypto.module#CryptoModule'},
  {path: 'settings', loadChildren: './settings/settings.module#SettingsModule'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  declarations: [],
  exports: [RouterModule]

})
export class AppRoutingModule {
}
