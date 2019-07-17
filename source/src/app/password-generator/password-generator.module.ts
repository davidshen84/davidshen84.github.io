import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordGeneratorRoutingModule } from './password-generator-routing.module';
import { PasswordGeneratorComponent } from './password-generator.component';
import { MaterialModules } from '../material.modules';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [PasswordGeneratorComponent],
  imports: [
    CommonModule,
    PasswordGeneratorRoutingModule,
    FormsModule,
    MaterialModules,
    ClipboardModule
  ]
})
export class PasswordGeneratorModule {
}
