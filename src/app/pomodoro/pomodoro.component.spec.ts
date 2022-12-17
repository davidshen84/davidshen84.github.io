import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PomodoroComponent, PomodoroTimePipe } from './pomodoro.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('PomodoroComponent', () => {
  let component: PomodoroComponent;
  let fixture: ComponentFixture<PomodoroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatButtonToggleModule,
        MatGridListModule,
        MatTooltipModule,
        MatSnackBarModule,
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
