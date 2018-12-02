import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TfjsRoutingModule} from './tfjs-routing.module';
import {TfjsComponent} from './tfjs.component';
import {MathJaxModule} from 'ngx-mathjax';

@NgModule({
  declarations: [TfjsComponent],
  imports: [
    CommonModule,
    TfjsRoutingModule,
    MathJaxModule.config(),
  ],
})
export class TfjsModule {
}
