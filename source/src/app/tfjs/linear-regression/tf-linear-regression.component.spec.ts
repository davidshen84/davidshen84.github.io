import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MarkdownModule} from 'ngx-markdown';
import {MathJaxModule} from 'ngx-mathjax';

import {TfLinearRegressionComponent} from './tf-linear-regression.component';

describe('TfLinearRegressionComponent', () => {
  let component: TfLinearRegressionComponent;
  let fixture: ComponentFixture<TfLinearRegressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TfLinearRegressionComponent],
      imports: [
        HttpClientTestingModule,
        MathJaxModule.config(),
        MarkdownModule.forRoot()
      ]
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
