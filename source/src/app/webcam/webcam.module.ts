import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WebcamRoutingModule} from './webcam-routing.module';
import {WebcamComponent} from './webcam.component';
import {WebcamModule as webcamModule} from 'ngx-webcam';

@NgModule({
  declarations: [WebcamComponent],
  imports: [
    CommonModule,
    WebcamRoutingModule,
    webcamModule
  ]
})
export class WebcamModule {
}
