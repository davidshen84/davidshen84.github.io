import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {BlogComponent} from '../blog/blog.component';

export const routes: Routes = [
  {path: '', component: BlogComponent},
  {path: ':id', component: BlogComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]

})
export class RoutingModule {
}
