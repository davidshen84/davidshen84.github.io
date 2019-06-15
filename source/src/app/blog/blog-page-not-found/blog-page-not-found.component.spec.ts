import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BlogPageNotFoundComponent} from './blog-page-not-found.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('BlogPageNotFoundComponent', () => {
  let component: BlogPageNotFoundComponent;
  let fixture: ComponentFixture<BlogPageNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: {params: of({id: 'notfound'})}}
      ],
      declarations: [BlogPageNotFoundComponent]
    })
      .compileComponents();
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
