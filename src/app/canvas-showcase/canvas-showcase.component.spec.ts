import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CanvasShowcaseComponent } from './canvas-showcase.component';
import { GaService } from '../ga.service';
import { HammerModule } from '@angular/platform-browser';
import 'hammerjs';
import { RemarkableComponent } from '../remarkable/remarkable.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';

describe('CanvasShowcaseComponent', () => {
  let component: CanvasShowcaseComponent;
  let fixture: ComponentFixture<CanvasShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HammerModule, RemarkableComponent, CanvasShowcaseComponent],
      providers: [
        GaService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter(routes),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
