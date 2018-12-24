import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaterialModules} from '../material.modules';

import {SettingsRoutingModule} from './settings-routing.module';
import {SettingsComponent} from './settings.component';
import {WebStorageModule} from 'ngx-store';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    MaterialModules,
    FormsModule,
    SettingsRoutingModule,
    WebStorageModule
  ]
})
export class SettingsModule {
}
