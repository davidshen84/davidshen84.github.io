import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { BlogPageComponent } from '../blog-page/blog-page.component';

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: ':id', component: BlogPageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  declarations: [],
  exports: [RouterModule]

})
export class RoutingModule {
}
