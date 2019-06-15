import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WebcamComponent} from './webcam.component';

const routes: Routes = [
  {path: '', component: WebcamComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebcamRoutingModule {
}
