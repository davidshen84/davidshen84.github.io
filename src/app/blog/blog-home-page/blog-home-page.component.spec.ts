import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlogHomePageComponent } from './blog-home-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatListModule } from '@angular/material/list';

describe('BlogHomePageComponent', () => {
  let component: BlogHomePageComponent;
  let fixture: ComponentFixture<BlogHomePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatListModule,
        BlogHomePageComponent,
      ],
    }).compileComponents();
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
