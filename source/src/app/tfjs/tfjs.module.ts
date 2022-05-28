import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TfjsRoutingModule } from './tfjs-routing.module';
import { TfLinearRegressionComponent } from './linear-regression/tf-linear-regression.component';
import { RemarkableModule } from '../remarkable/remarkable.module';

@NgModule({
  declarations: [TfLinearRegressionComponent],
  imports: [CommonModule, TfjsRoutingModule, RemarkableModule],
})
export class TfjsModule {}
