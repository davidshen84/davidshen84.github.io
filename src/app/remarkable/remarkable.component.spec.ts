import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkableComponent } from './remarkable.component';
import { HttpClientModule } from '@angular/common/http';

describe('RemarkableComponent', () => {
  let component: RemarkableComponent;
  let fixture: ComponentFixture<RemarkableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemarkableComponent],
      imports: [HttpClientModule],
    }).compileComponents();
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
