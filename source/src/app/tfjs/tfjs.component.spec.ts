import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TfjsComponent } from './tfjs.component';

describe('TfjsComponent', () => {
  let component: TfjsComponent;
  let fixture: ComponentFixture<TfjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TfjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TfjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
