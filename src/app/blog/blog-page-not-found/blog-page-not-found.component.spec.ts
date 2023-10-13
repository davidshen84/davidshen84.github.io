import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlogPageNotFoundComponent } from './blog-page-not-found.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('BlogPageNotFoundComponent', () => {
  let component: BlogPageNotFoundComponent;
  let fixture: ComponentFixture<BlogPageNotFoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BlogPageNotFoundComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: 'notfound' }) },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
