import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WebcamComponent } from './webcam.component';
import { WebcamModule } from '@davidshen84/ngx-webcam';
import { RouterTestingModule } from '@angular/router/testing';
import { GaService } from '../ga.service';

describe('WebcamComponent', () => {
  let component: WebcamComponent;
  let fixture: ComponentFixture<WebcamComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [WebcamComponent],
        imports: [WebcamModule, RouterTestingModule],
        providers: [GaService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
