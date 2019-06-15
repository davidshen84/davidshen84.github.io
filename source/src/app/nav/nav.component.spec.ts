import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {NavComponent} from './nav.component';

import {MaterialModules} from '../material.modules';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {MarkdownModule} from 'ngx-markdown';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule,
        MaterialModules,
        RouterTestingModule,
        MarkdownModule.forRoot()
      ],
      declarations: [NavComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
