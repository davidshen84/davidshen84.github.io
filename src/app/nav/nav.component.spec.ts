import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, RouterTestingModule],
      declarations: [NavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
