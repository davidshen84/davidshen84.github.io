import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkableComponent } from './remarkable.component';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { SimpleChange } from '@angular/core';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('RemarkableComponent', () => {
  let component: RemarkableComponent;
  let fixture: ComponentFixture<RemarkableComponent>;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemarkableComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(RemarkableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render markdown content', () => {
    component.ngOnChanges({
      src: {
        currentValue: 'mock://test',
        isFirstChange: () => false,
      } as SimpleChange,
    });
    httpController.expectOne('mock://test').flush('# test');

    const markdown = component.markdown();
    expect(markdown).not.toBeNull();
    expect(markdown.toString()).toContain('<h1>test</h1>');
  });
});
