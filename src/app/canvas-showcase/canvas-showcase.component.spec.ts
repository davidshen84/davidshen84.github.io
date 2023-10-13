import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CanvasShowcaseComponent } from './canvas-showcase.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GaService } from '../ga.service';
import { HammerModule } from '@angular/platform-browser';
import 'hammerjs';
import { RemarkableComponent } from '../remarkable/remarkable.component';

describe('CanvasShowcaseComponent', () => {
  let component: CanvasShowcaseComponent;
  let fixture: ComponentFixture<CanvasShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        HammerModule,
        RemarkableComponent,
        CanvasShowcaseComponent,
      ],
      providers: [GaService],
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
