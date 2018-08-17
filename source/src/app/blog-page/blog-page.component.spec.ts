import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

import {MarkdownModule} from 'ngx-markdown';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { BlogPageComponent } from './blog-page.component';

describe('BlogPageComponent', () => {
  let component: BlogPageComponent;
  let fixture: ComponentFixture<BlogPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MarkdownModule.forRoot()
      ],
      providers: [
        {provide: ActivatedRoute, useValue: {params: of({id: 'x'})}},
      ],
      declarations: [ BlogPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    expect(component).toBeTruthy();
    httpMock.expectOne('assets/blogs/x.md');
    httpMock.verify();
  }));
});
