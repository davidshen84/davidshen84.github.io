import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RS256CryptoService } from '../crypto/rs256-crypto.service';

import { SettingsComponent } from './settings.component';
import { NgxWebstorageModule } from 'ngx-webstorage';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSnackBarModule,
        FormsModule,
        NgxWebstorageModule.forRoot(),
      ],
      providers: [RS256CryptoService],
      declarations: [SettingsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
