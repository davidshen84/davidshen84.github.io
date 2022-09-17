import {
  ComponentFixture,
  inject,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { BlogPageComponent } from './blog-page.component';
import { RemarkableModule } from '../../remarkable/remarkable.module';
import * as http from 'http';

describe('BlogPageComponent', () => {
  let component: BlogPageComponent;
  let fixture: ComponentFixture<BlogPageComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'blog/:id', component: BlogPageComponent },
        ]),
        RemarkableModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({ id: 'x' }) } },
      ],
      declarations: [BlogPageComponent],
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', inject(
    [HttpTestingController],
    (_: HttpTestingController) => {
      expect(component).toBeTruthy();
    },
  ));

  it('should make http request to x.md file', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      fixture.detectChanges();

      httpMock.expectOne('assets/blogs/x.md');

      httpMock.verify();
      expect().nothing();
    },
  ));

  it('should redirect to blog/notfound/x', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      fixture.detectChanges();

      httpMock
        .expectOne('assets/blogs/x.md')
        .error(new ProgressEvent('error'), { status: 404 });

      expect(router.navigate).toHaveBeenCalledWith(['blog/notfound', 'x']);
      httpMock.verify();
    },
  ));
});
