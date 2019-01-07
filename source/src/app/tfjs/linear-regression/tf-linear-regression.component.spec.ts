import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TfLinearRegressionComponent} from './tf-linear-regression.component';
import {MathJaxModule} from 'ngx-mathjax';

describe('TfLinearRegressionComponent', () => {
  let component: TfLinearRegressionComponent;
  let fixture: ComponentFixture<TfLinearRegressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TfLinearRegressionComponent],
      imports: [MathJaxModule.config()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TfLinearRegressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
