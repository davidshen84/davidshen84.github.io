import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GaeBlogPageComponent} from './gae-blog-page.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {GaeBlogService} from './gae-blog.service';

describe('GaeBlogPageComponent', () => {
  let component: GaeBlogPageComponent;
  let fixture: ComponentFixture<GaeBlogPageComponent>;
  let gaeBlogService: GaeBlogService;
  let getBlogSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [GaeBlogPageComponent],
      providers: [
        {provide: ActivatedRoute, useValue: {params: of({id: 'x'})}}
      ]
    })
      .compileComponents();

    gaeBlogService = TestBed.get(GaeBlogService);
    getBlogSpy = spyOn(gaeBlogService, 'GetBlog');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaeBlogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke GaeBlogService.GetBlog', () => {
    expect(getBlogSpy).toHaveBeenCalledWith('x');
  });
});
