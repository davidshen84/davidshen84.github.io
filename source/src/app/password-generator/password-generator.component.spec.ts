import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import 'hammerjs';

import {PasswordGeneratorComponent} from './password-generator.component';
import {MaterialModules} from '../material.modules';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBar} from '@angular/material';


describe('PasswordGeneratorComponent', () => {
  let component: PasswordGeneratorComponent;
  let fixture: ComponentFixture<PasswordGeneratorComponent>;
  let matSnackBar: MatSnackBar;
  let openSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule, FormsModule, MaterialModules, ClipboardModule ],
      declarations: [ PasswordGeneratorComponent ]
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
