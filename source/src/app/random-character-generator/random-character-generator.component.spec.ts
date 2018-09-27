import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'hammerjs';

import { RandomCharacterGeneratorComponent } from './random-character-generator.component';
import { MaterialModules } from '../material.modules';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material';


describe('RandomCharacterGeneratorComponent', () => {
  let component: RandomCharacterGeneratorComponent;
  let fixture: ComponentFixture<RandomCharacterGeneratorComponent>;
  let matSnackBar: MatSnackBar;
  let openSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule, FormsModule, MaterialModules, ClipboardModule ],
      declarations: [ RandomCharacterGeneratorComponent ]
    })
      .compileComponents();

    matSnackBar = TestBed.get(MatSnackBar);
    openSpy = spyOn(matSnackBar, 'open');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomCharacterGeneratorComponent);
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
