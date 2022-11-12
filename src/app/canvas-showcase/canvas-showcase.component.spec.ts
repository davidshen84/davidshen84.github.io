import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CanvasShowcaseComponent } from './canvas-showcase.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GaService } from '../ga.service';
import { HammerModule } from '@angular/platform-browser';
import 'hammerjs';
import { RemarkableModule } from '../remarkable/remarkable.module';

describe('CanvasShowcaseComponent', () => {
  let component: CanvasShowcaseComponent;
  let fixture: ComponentFixture<CanvasShowcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasShowcaseComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        HammerModule,
        RemarkableModule,
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
