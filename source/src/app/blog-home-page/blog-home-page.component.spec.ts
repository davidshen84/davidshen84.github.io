import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BlogHomePageComponent} from './blog-home-page.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MarkdownModule} from 'ngx-markdown';
import {GaeBlogHomePageComponent} from '../gae-blog-home-page/gae-blog-home-page.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { MatListModule } from '@angular/material';

describe('BlogHomePageComponent', () => {
  let component: BlogHomePageComponent;
  let fixture: ComponentFixture<BlogHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MarkdownModule.forRoot(),
        MatListModule
      ],
      declarations: [BlogHomePageComponent,
        GaeBlogHomePageComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
