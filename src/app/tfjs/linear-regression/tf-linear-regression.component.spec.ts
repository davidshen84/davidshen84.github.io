import * as tf from '@tensorflow/tfjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TfLinearRegressionComponent } from './tf-linear-regression.component';
import { ElementRef } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { GaService } from '../../ga.service';
import { RemarkableModule } from '../../remarkable/remarkable.module';

class MockElementRef extends ElementRef {}

describe('TfLinearRegressionComponent', () => {
  let component: TfLinearRegressionComponent;
  let fixture: ComponentFixture<TfLinearRegressionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TfLinearRegressionComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, RemarkableModule],
      providers: [{ provide: ElementRef, useValue: MockElementRef }, GaService],
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
