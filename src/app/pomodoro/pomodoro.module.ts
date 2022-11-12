import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../material.modules';
import { PomodoroComponent, PomodoroTimePipe } from './pomodoro.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { PomodoroRoutingModule } from './pomodoro-routing.module';

@NgModule({
  declarations: [PomodoroComponent, PomodoroTimePipe],
  imports: [
    PomodoroRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModules,
    MatTooltipModule,
    MatButtonToggleModule,
    MatGridListModule,
  ],
})
export class PomodoroModule {}
