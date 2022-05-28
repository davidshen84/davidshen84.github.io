import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MarkdownModule } from 'ngx-markdown';

import { TfLinearRegressionComponent } from './tf-linear-regression.component';
import { ElementRef } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { GaService } from '../../ga.service';

class MockElementRef extends ElementRef {}

describe('TfLinearRegressionComponent', () => {
  let component: TfLinearRegressionComponent;
  let fixture: ComponentFixture<TfLinearRegressionComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TfLinearRegressionComponent],
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          MarkdownModule.forRoot(),
        ],
        providers: [
          { provide: ElementRef, useValue: MockElementRef },
          GaService,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TfLinearRegressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
