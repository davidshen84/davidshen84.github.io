import {async, inject, TestBed} from '@angular/core/testing';

import {GaeBlogService} from './gae-blog.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('GaeBlogService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: GaeBlogService = TestBed.get(GaeBlogService);
    expect(service).toBeTruthy();
  });

  it('should make http request to resources/blogs', async(
    inject([HttpTestingController, GaeBlogService], (httpMock: HttpTestingController, service: GaeBlogService) => {
      service.GetBlogs().subscribe();
      httpMock.expectOne('https://davidshen84.appspot.com/blog/resources/blogs');
      httpMock.verify();
    })));

  it('should make http request to resources/blogs/x', async(
    inject([GaeBlogService, HttpTestingController], (service: GaeBlogService, httpMock: HttpTestingController) => {
      service.GetBlog('x').subscribe();
      httpMock.expectOne('https://davidshen84.appspot.com/blog/resources/blogs/x');
      httpMock.verify();
    })));
});
