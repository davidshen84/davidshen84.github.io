import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordGeneratorRoutingModule } from './password-generator-routing.module';
import { PasswordGeneratorComponent } from './password-generator.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [PasswordGeneratorComponent],
  imports: [
    CommonModule,
    PasswordGeneratorRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    ClipboardModule,
    MatTooltipModule,
  ],
})
export class PasswordGeneratorModule {}
