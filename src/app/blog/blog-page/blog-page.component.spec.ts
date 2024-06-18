import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { BlogPageComponent } from './blog-page.component';
import { RemarkableComponent } from '../../remarkable/remarkable.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { RouterTestingHarness } from '@angular/router/testing';
import { GaService } from '../../ga.service';

describe('BlogPageComponent', () => {
  let component: BlogPageComponent;
  let router: Router;

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      imports: [RemarkableComponent, BlogPageComponent],
      providers: [
        GaService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([
          {
            path: 'blog/:id',
            component: BlogPageComponent,
          },
        ]),
      ],
    }).compileComponents();

    const mock = TestBed.inject(GaService);
    spyOn(mock, 'SetPageView').and.callFake(() => {});
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  }));

  beforeEach(waitForAsync(async () => {
    const harness = await RouterTestingHarness.create();
    component = await harness.navigateByUrl('blog/x', BlogPageComponent);
    harness.detectChanges();
  }));

  it('should create', inject(
    [HttpTestingController],
    (_: HttpTestingController) => {
      expect(component).toBeTruthy();
    },
  ));

  it('should make http request to x.md file', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      httpMock.expectOne('assets/blogs/x.md');

      httpMock.verify();
      expect().nothing();
    },
  ));

  it('should redirect to blog/notfound/x', inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      httpMock
        .expectOne('assets/blogs/x.md')
        .error(new ProgressEvent('error'), { status: 404 });

      expect(router.navigate).toHaveBeenCalledWith(['blog/notfound', 'x']);
      httpMock.verify();
    },
  ));
});
