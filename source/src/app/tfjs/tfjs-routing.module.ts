import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TfLinearRegressionComponent} from './linear-regression/tf-linear-regression.component';

const routes: Routes = [
  {path: '', component: TfLinearRegressionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TfjsRoutingModule {
}
