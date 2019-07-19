import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { ClipboardModule } from 'ngx-clipboard';
import { MaterialModules } from '../material.modules';
import { PasswordGeneratorComponent } from './password-generator.component';
import { GaService } from '../ga.service';
import { RouterTestingModule } from '@angular/router/testing';


describe('PasswordGeneratorComponent', () => {
  let component: PasswordGeneratorComponent;
  let fixture: ComponentFixture<PasswordGeneratorComponent>;
  let matSnackBar: MatSnackBar;
  let openSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MaterialModules,
        ClipboardModule,
        RouterTestingModule
      ],
      declarations: [PasswordGeneratorComponent],
      providers: [GaService]
    })
      .compileComponents();

    matSnackBar = TestBed.get(MatSnackBar);
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
    expect(openSpy).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(String), {duration: 500});
  });
});
