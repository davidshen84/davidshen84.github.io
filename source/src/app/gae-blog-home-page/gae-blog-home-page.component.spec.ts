import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GaeBlogHomePageComponent} from './gae-blog-home-page.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {GaeBlogPageComponent} from '../gae-blog-page/gae-blog-page.component';
import {MarkdownModule} from 'ngx-markdown';

describe('GaeBlogHomePageComponent', () => {
  let component: GaeBlogHomePageComponent;
  let fixture: ComponentFixture<GaeBlogHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {path: 'blog/gae/:id', component: GaeBlogPageComponent}
        ]),
        MarkdownModule.forRoot()
      ],
      declarations: [GaeBlogHomePageComponent, GaeBlogPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaeBlogHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
