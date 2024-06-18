import * as tf from '@tensorflow/tfjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TfLinearRegressionComponent } from './tf-linear-regression.component';
import { GaService } from '../../ga.service';
import { RemarkableComponent } from '../../remarkable/remarkable.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../tfjs.routes';

describe('TfLinearRegressionComponent', () => {
  let component: TfLinearRegressionComponent;
  let fixture: ComponentFixture<TfLinearRegressionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RemarkableComponent, TfLinearRegressionComponent],
      providers: [
        GaService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter(routes),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    tf.setBackend('cpu');
    fixture = TestBed.createComponent(TfLinearRegressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
