import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { WebcamComponent } from './webcam.component';
import { GaService } from '../ga.service';
import { WebcamModule } from 'ngx-webcam';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';

describe('WebcamComponent', () => {
  let component: WebcamComponent;
  let fixture: ComponentFixture<WebcamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [WebcamModule, WebcamComponent],
      providers: [GaService, provideRouter(routes)],
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
