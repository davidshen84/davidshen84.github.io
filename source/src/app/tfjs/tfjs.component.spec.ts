import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TfjsComponent} from './tfjs.component';
import {MathJaxModule} from 'ngx-mathjax';

describe('TfjsComponent', () => {
  let component: TfjsComponent;
  let fixture: ComponentFixture<TfjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TfjsComponent],
      imports: [MathJaxModule.config()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TfjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
