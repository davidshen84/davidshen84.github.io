import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TfjsComponent} from './tfjs.component';

const routes: Routes = [
  {path: '', component: TfjsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TfjsRoutingModule {
}
