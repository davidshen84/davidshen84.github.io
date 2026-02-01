import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
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
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('CryptoRS256Component', () => {
  let component: CryptoRS256Component;
  let fixture: ComponentFixture<CryptoRS256Component>;
  let cryptoService: RS256CryptoService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        RouterTestingModule,
        RemarkableComponent,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        CryptoRS256Component,
      ],
      providers: [
        RS256CryptoService,
        GaService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoRS256Component);
    component = fixture.componentInstance;
    cryptoService = TestBed.inject(RS256CryptoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Signal behavior', () => {
    it('should initialize header signal with default value', () => {
      const headerValue = component.header();
      expect(headerValue).toContain('RS256');
      expect(headerValue).toContain('JWT');
    });

    it('should initialize payload signal with default value', () => {
      const payloadValue = component.payload();
      expect(payloadValue).toContain('1234567890');
      expect(payloadValue).toContain('John Doe');
    });

    it('should initialize privateKeyInput signal as empty string', () => {
      expect(component.privateKeyInput()).toBe('');
    });

    it('should compute encodedHeader when header changes', () => {
      const initialEncoded = component.encodedHeader();
      expect(initialEncoded).toBeTruthy();

      component.header.set('{"alg":"RS256","typ":"JWT"}');
      fixture.detectChanges();

      const newEncoded = component.encodedHeader();
      expect(newEncoded).toBeTruthy();
      expect(newEncoded).not.toBe(initialEncoded);
    });

    it('should compute encodedPayload when payload changes', () => {
      const initialEncoded = component.encodedPayload();
      expect(initialEncoded).toBeTruthy();

      component.payload.set('{"sub":"test","name":"Test User"}');
      fixture.detectChanges();

      const newEncoded = component.encodedPayload();
      expect(newEncoded).toBeTruthy();
      expect(newEncoded).not.toBe(initialEncoded);
    });

    it('should return empty JWT when signature is empty', () => {
      component.signature.set('');
      expect(component.jwt()).toBe('');
    });

    it('should compute JWT when signature is present', () => {
      component.signature.set('test-signature');
      const jwt = component.jwt();
      expect(jwt).toContain('.');
      expect(jwt).toContain('test-signature');
    });

    it('should update signature when privateKeyInput changes', fakeAsync(() => {
      const mockSignature = 'mock-signature';
      spyOn(cryptoService, 'sign').and.returnValue(
        Promise.resolve(mockSignature),
      );

      component.privateKeyInput.set('test-private-key');
      tick();
      fixture.detectChanges();

      expect(cryptoService.sign).toHaveBeenCalled();
    }));

    it('should set empty signature when privateKeyInput is empty', fakeAsync(() => {
      component.privateKeyInput.set('test-key');
      tick();
      fixture.detectChanges();

      component.privateKeyInput.set('');
      tick();
      fixture.detectChanges();

      expect(component.signature()).toBe('');
    }));

    it('should handle sign errors gracefully', fakeAsync(() => {
      spyOn(cryptoService, 'sign').and.returnValue(Promise.resolve(''));

      component.privateKeyInput.set('invalid-key');
      tick();
      fixture.detectChanges();

      expect(component.signature()).toBe('');
    }));
  });
});
