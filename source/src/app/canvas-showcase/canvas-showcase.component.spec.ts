import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasShowcaseComponent } from './canvas-showcase.component';

describe('CanvasShowcaseComponent', () => {
  let component: CanvasShowcaseComponent;
  let fixture: ComponentFixture<CanvasShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasShowcaseComponent ]
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
