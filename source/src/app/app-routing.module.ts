import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {BlogPageComponent} from './blog-page/blog-page.component';
import {BlogPageNotFoundComponent} from './blog-page-not-found/blog-page-not-found.component';
import {BlogHomePageComponent} from './blog-home-page/blog-home-page.component';
import {GaeBlogPageComponent} from './gae-blog-page/gae-blog-page.component';
import {CanvasShowcaseComponent} from './canvas-showcase/canvas-showcase.component';


export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'blog/home', component: BlogHomePageComponent},
  {path: 'blog/:id', component: BlogPageComponent},
  {path: 'blog/gae/:id', component: GaeBlogPageComponent},
  {path: 'blog/notfound/:id', component: BlogPageNotFoundComponent},
  {path: 'password-generator', loadChildren: './password-generator/password-generator.module#PasswordGeneratorModule'},
  {path: 'webcam', loadChildren: './webcam/webcam.module#WebcamModule'},
  {path: 'canvas', component: CanvasShowcaseComponent},
  {path: 'tfjs', loadChildren: './tfjs/tfjs.module#TfjsModule'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  declarations: [],
  exports: [RouterModule]

})
export class AppRoutingModule {
}
