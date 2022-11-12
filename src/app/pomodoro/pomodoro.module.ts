import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PomodoroComponent, PomodoroTimePipe } from './pomodoro.component';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { PomodoroRoutingModule } from './pomodoro-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [PomodoroComponent, PomodoroTimePipe],
  imports: [
    PomodoroRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatSnackBarModule,
  ],
})
export class PomodoroModule {}
