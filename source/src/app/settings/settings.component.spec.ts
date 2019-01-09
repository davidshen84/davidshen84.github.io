import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {WebStorageModule} from 'ngx-store';
import {RS256CryptoService} from '../crypto/rs256-crypto.service';

import {SettingsComponent} from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        WebStorageModule
      ],
      providers: [
        RS256CryptoService
      ],
      declarations: [SettingsComponent]
    })
      .compileComponents();
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
