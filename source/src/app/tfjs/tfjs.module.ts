import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

import { TfjsRoutingModule } from './tfjs-routing.module';
import { TfLinearRegressionComponent } from './linear-regression/tf-linear-regression.component';
import { MathJaxModule } from 'ngx-mathjax';

@NgModule({
  declarations: [TfLinearRegressionComponent],
  imports: [
    CommonModule,
    TfjsRoutingModule,
    MathJaxModule.config(false),
    MarkdownModule.forChild(),
  ],
})
export class TfjsModule {
}
