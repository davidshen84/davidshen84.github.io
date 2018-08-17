import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {BlogComponent} from '../blog/blog.component';
import { HomePageComponent } from '../home-page/home-page.component';

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: ':id', component: BlogComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  declarations: [],
  exports: [RouterModule]

})
export class RoutingModule {
}
