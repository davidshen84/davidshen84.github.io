import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkableComponent } from './remarkable.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SimpleChange } from '@angular/core';

describe('RemarkableComponent', () => {
  let component: RemarkableComponent;
  let fixture: ComponentFixture<RemarkableComponent>;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemarkableComponent],
      imports: [HttpClientTestingModule],
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
    component.markdown$.subscribe((x) => {
      expect(x).not.toBeNull();
      expect(x.toString()).toContain('<h1>test</h1>');
    });

    component.ngOnChanges({
      src: {
        currentValue: 'mock://test',
        isFirstChange: () => false,
      } as SimpleChange,
    });
    httpController.expectOne('mock://test').flush('# test');
  });
});
