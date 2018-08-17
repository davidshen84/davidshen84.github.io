import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModules} from './material.modules';
import {RouterTestingModule} from '@angular/router/testing';
import { MarkdownModule } from 'ngx-markdown';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModules,
        RouterTestingModule,
        MarkdownModule.forRoot()
      ],
      declarations: [
        AppComponent,
        NavComponent,
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have title property set`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).not.toBeNull();
    expect(app.title).not.toBe('');
  }));
  it('should render empty title', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent).toBe('');
  }));
});
