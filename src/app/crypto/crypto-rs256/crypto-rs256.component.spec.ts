import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RS256CryptoService } from '../rs256-crypto.service';

import { CryptoRS256Component } from './crypto-rs256.component';
import { GaService } from '../../ga.service';
import { RouterTestingModule } from '@angular/router/testing';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { RemarkableComponent } from '../../remarkable/remarkable.component';

describe('CryptoRS256Component', () => {
  let component: CryptoRS256Component;
  let fixture: ComponentFixture<CryptoRS256Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        RemarkableComponent,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        CryptoRS256Component,
      ],
      providers: [RS256CryptoService, GaService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoRS256Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
