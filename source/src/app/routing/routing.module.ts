import {NgModule} from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { BlogPageComponent } from '../blog-page/blog-page.component';
import { BlogPageNotFoundComponent } from '../blog-page-not-found/blog-page-not-found.component';
import { BlogHomePageComponent } from '../blog-home-page/blog-home-page.component';

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'blog/home', component: BlogHomePageComponent},
  {path: 'blog/:id', component: BlogPageComponent},
  {path: 'blog/notfound/:id', component: BlogPageNotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  declarations: [],
  exports: [RouterModule]

})
export class RoutingModule {
}
