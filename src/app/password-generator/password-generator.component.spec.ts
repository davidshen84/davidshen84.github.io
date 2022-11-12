import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from '../material.modules';
import { PasswordGeneratorComponent } from './password-generator.component';
import { GaService } from '../ga.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ClipboardModule } from '@angular/cdk/clipboard';

describe('PasswordGeneratorComponent', () => {
  let component: PasswordGeneratorComponent;
  let fixture: ComponentFixture<PasswordGeneratorComponent>;
  let matSnackBar: MatSnackBar;
  let openSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MaterialModules,
        RouterTestingModule,
        ClipboardModule,
      ],
      declarations: [PasswordGeneratorComponent],
      providers: [GaService],
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
});
