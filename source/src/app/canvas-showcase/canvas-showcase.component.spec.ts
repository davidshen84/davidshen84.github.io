import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'hammerjs';
import { MarkdownModule } from 'ngx-markdown';

import { CanvasShowcaseComponent } from './canvas-showcase.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GaService } from '../ga.service';

describe('CanvasShowcaseComponent', () => {
  let component: CanvasShowcaseComponent;
  let fixture: ComponentFixture<CanvasShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasShowcaseComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MarkdownModule.forRoot()
      ],
      providers: [GaService]
    })
      .compileComponents();
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
