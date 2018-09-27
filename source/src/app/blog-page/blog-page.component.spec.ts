import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { MarkdownModule } from 'ngx-markdown';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { BlogPageComponent } from './blog-page.component';


describe('BlogPageComponent', () => {
  let component: BlogPageComponent;
  let fixture: ComponentFixture<BlogPageComponent>;
  let router: Router;
  let routerSpy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {path: 'blog/:id', component: BlogPageComponent}
        ]),
        MarkdownModule.forRoot()
      ],
      providers: [
        {provide: ActivatedRoute, useValue: {params: of({id: 'x'})}},
      ],
      declarations: [ BlogPageComponent ]
    })
      .compileComponents();

    router = TestBed.get(Router);
    routerSpy = spyOn(router, 'navigate');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    expect(component).toBeTruthy();
  }));

  it('should make http request to x.md file', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    fixture.detectChanges();

    httpMock.expectOne('assets/blogs/x.md');

    httpMock.verify();
  }));

  it('should redirect to blog/notfound/x', inject([HttpTestingController], (httpMock: HttpTestingController) => {
    fixture.detectChanges();

    httpMock.match('assets/blogs/x.md')[0].error(new ErrorEvent('error'), {status: 404});
    expect(router.navigate).toHaveBeenCalledWith(['blog/notfound', 'x']);
  }));
});
