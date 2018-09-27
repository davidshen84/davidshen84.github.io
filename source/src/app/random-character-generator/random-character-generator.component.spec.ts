import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomCharacterGeneratorComponent } from './random-character-generator.component';
import { MaterialModules } from '../material.modules';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RandomCharacterGeneratorComponent', () => {
  let component: RandomCharacterGeneratorComponent;
  let fixture: ComponentFixture<RandomCharacterGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NoopAnimationsModule, FormsModule, MaterialModules, ClipboardModule ],
      declarations: [ RandomCharacterGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomCharacterGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
