import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { MaterialModules } from '../material.modules';
import { PasswordGeneratorRoutingModule } from './password-generator-routing.module';
import { PasswordGeneratorComponent } from './password-generator.component';


@NgModule({
  declarations: [PasswordGeneratorComponent],
  imports: [
    CommonModule,
    PasswordGeneratorRoutingModule,
    ReactiveFormsModule,
    MaterialModules,
    ClipboardModule
  ]
})
export class PasswordGeneratorModule {
}
