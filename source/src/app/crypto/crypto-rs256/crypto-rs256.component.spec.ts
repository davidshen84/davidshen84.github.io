import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';
import { MaterialModules } from '../../material.modules';
import { RS256CryptoService } from '../rs256-crypto.service';

import { CryptoRS256Component } from './crypto-rs256.component';
import { GaService } from '../../ga.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('CryptoRS256Component', () => {
  let component: CryptoRS256Component;
  let fixture: ComponentFixture<CryptoRS256Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        MaterialModules,
        RouterTestingModule,
        HttpClientTestingModule,
        MarkdownModule.forRoot()
      ],
      declarations: [CryptoRS256Component],
      providers: [
        RS256CryptoService,
        GaService
      ]
    })
      .compileComponents();
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
