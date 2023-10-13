import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WebcamComponent } from './webcam.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GaService } from '../ga.service';
import { WebcamModule } from 'ngx-webcam';

describe('WebcamComponent', () => {
  let component: WebcamComponent;
  let fixture: ComponentFixture<WebcamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [WebcamModule, RouterTestingModule, WebcamComponent],
      providers: [GaService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
