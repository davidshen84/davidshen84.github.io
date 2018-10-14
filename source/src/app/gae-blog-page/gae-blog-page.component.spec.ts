import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GaeBlogPageComponent} from './gae-blog-page.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {GaeBlogService} from './gae-blog.service';
import {TitleService} from '../title.service';
import {MarkdownModule} from 'ngx-markdown';

describe('GaeBlogPageComponent', () => {
  let component: GaeBlogPageComponent;
  let fixture: ComponentFixture<GaeBlogPageComponent>;
  let gaeBlogService: GaeBlogService;
  let getBlogSpy: jasmine.Spy;

  let titleService: TitleService;
  let setTitleSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MarkdownModule.forRoot()],
      declarations: [GaeBlogPageComponent],
      providers: [
        {provide: ActivatedRoute, useValue: {params: of({id: 'x'})}}
      ]
    })
      .compileComponents();

    gaeBlogService = TestBed.get(GaeBlogService);
    getBlogSpy = spyOn(gaeBlogService, 'getBlog');
    getBlogSpy.and.returnValue(of({title: 'title'}));

    titleService = TestBed.get(TitleService);
    setTitleSpy = spyOn(titleService, 'setTitle');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaeBlogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke GaeBlogService.getBlog', () => {
    expect(getBlogSpy).toHaveBeenCalledWith('x');
  });

  it('should invoke TitleService.SetTitle', () => {
    expect(setTitleSpy).toHaveBeenCalled();
  });
});
