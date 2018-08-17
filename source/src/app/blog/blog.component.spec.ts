import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import {BlogComponent} from './blog.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {MarkdownModule} from 'ngx-markdown';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MarkdownModule.forRoot()
      ],
      providers: [
        {provide: ActivatedRoute, useValue: {params: of({id: 'x'})}},
      ],
      declarations: [BlogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    expect(component).toBeTruthy();
    httpMock.expectOne('assets/blogs/x.md');
    httpMock.verify();
  }));
});
