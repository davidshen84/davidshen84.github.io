import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { QRCodeComponent } from 'angularx-qrcode';
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let breakpointObserverMock: jasmine.SpyObj<BreakpointObserver>;

  beforeEach(waitForAsync(() => {
    breakpointObserverMock = jasmine.createSpyObj('BreakpointObserver', [
      'observe',
    ]);
    breakpointObserverMock.observe.and.returnValue(
      of({ matches: false, breakpoints: {} }),
    );

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        QRCodeComponent,
        MatListModule,
        MatIconModule,
        NavComponent,
      ],
      providers: [
        provideRouter(routes),
        { provide: BreakpointObserver, useValue: breakpointObserverMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeDefined();
  });

  it('should create mat nav list', () => {
    expect(fixture.debugElement.query(By.css('mat-nav-list'))).toBeTruthy();
  });

  it('should initialize with desktop layout (isHandset = false)', () => {
    const sidenav = fixture.debugElement.query(By.css('mat-sidenav'));
    const menuButton = fixture.debugElement.query(
      By.css('button[aria-label="Toggle sidenav"]'),
    );

    expect(component.isHandset().matches).toBe(false);
    expect(sidenav.nativeElement.getAttribute('role')).toBe('navigation');
    expect(sidenav.componentInstance.mode).toBe('side');
    expect(sidenav.componentInstance.opened).toBe(true);
    expect(menuButton).toBeNull();
  });

  it('should adapt to handset layout (isHandset = true)', () => {
    // Reconfigure the mock to return a handset layout
    breakpointObserverMock.observe.and.returnValue(
      of({ matches: true, breakpoints: {} }),
    );

    // Recreate the component with the new mock configuration
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const sidenav = fixture.debugElement.query(By.css('mat-sidenav'));
    const menuButton = fixture.debugElement.query(
      By.css('button[aria-label="Toggle sidenav"]'),
    );

    expect(component.isHandset().matches).toBe(true);
    expect(sidenav.nativeElement.getAttribute('role')).toBe('dialog');
    expect(sidenav.componentInstance.mode).toBe('over');
    expect(sidenav.componentInstance.opened).toBe(false);
    expect(menuButton).toBeTruthy();
  });
});
