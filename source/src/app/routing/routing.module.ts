import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from '../home-page/home-page.component';
import {BlogPageComponent} from '../blog-page/blog-page.component';
import {BlogPageNotFoundComponent} from '../blog-page-not-found/blog-page-not-found.component';
import {BlogHomePageComponent} from '../blog-home-page/blog-home-page.component';
import {PasswordGeneratorComponent} from '../password-generator/password-generator.component';
import {GaeBlogPageComponent} from '../gae-blog-page/gae-blog-page.component';
import { WebcamComponent } from '../webcam/webcam.component';

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'blog/home', component: BlogHomePageComponent},
  {path: 'blog/:id', component: BlogPageComponent},
  {path: 'blog/gae/:id', component: GaeBlogPageComponent},
  {path: 'blog/notfound/:id', component: BlogPageNotFoundComponent},
  {path: 'password-generator', component: PasswordGeneratorComponent},
  {path: 'webcam', component: WebcamComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  declarations: [],
  exports: [RouterModule]

})
export class RoutingModule {
}
