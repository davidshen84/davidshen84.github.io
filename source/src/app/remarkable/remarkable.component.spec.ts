import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkableComponent } from './remarkable.component';

describe('RemarkableComponent', () => {
  let component: RemarkableComponent;
  let fixture: ComponentFixture<RemarkableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarkableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarkableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
