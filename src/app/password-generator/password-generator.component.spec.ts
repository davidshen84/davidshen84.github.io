import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordGeneratorComponent } from './password-generator.component';
import { GaService } from '../ga.service';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { By } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';

describe('PasswordGeneratorComponent', () => {
  let component: PasswordGeneratorComponent;
  let fixture: ComponentFixture<PasswordGeneratorComponent>;
  let matSnackBar: MatSnackBar;
  let openSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatSnackBarModule,
        MatInputModule,
        MatCheckboxModule,
        ClipboardModule,
        ReactiveFormsModule,
        MatCardModule,
        MatSliderModule,
        MatDividerModule,
        PasswordGeneratorComponent,
      ],
      providers: [GaService, provideRouter(routes)],
    }).compileComponents();

    matSnackBar = TestBed.inject(MatSnackBar);
    openSpy = spyOn(matSnackBar, 'open');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call MatSnackBar.open', () => {
    component.openSnackBar();
    expect(openSpy).toHaveBeenCalledWith(
      jasmine.any(String),
      jasmine.any(String),
      { duration: 500 },
    );
  });

  it('should generate new password', fakeAsync(() => {
    const copyTarget = fixture.debugElement.query(By.css('#copyTarget'));
    const generateButton = fixture.debugElement.query(By.css('#generate'));

    expect(copyTarget).toBeTruthy();
    expect(generateButton).toBeTruthy();

    const oldValue = copyTarget.nativeElement.value;

    generateButton.triggerEventHandler('click');
    fixture.detectChanges();

    expect(copyTarget.nativeElement.value).not.toEqual(oldValue);
  }));
});
