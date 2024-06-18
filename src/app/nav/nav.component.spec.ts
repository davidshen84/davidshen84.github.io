import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { QRCodeModule } from 'angularx-qrcode';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        QRCodeModule,
        MatListModule,
        MatIconModule,
        NavComponent,
      ],
      providers: [provideRouter(routes)],
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
});
