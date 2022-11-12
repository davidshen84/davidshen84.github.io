import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PomodoroComponent, PomodoroTimePipe } from './pomodoro.component';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { MaterialModules } from '../material.modules';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

describe('PomodoroComponent', () => {
  let component: PomodoroComponent;
  let fixture: ComponentFixture<PomodoroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModules,
        NoopAnimationsModule,
        MatButtonToggleModule,
        MatGridListModule,
        MatTooltipModule,
      ],
      declarations: [PomodoroComponent, PomodoroTimePipe],
    }).compileComponents();
    TestBed.inject(MatSnackBar);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PomodoroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
