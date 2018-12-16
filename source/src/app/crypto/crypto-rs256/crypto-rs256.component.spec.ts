import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CryptoRS256Component} from './crypto-rs256.component';
import {MarkdownModule} from 'ngx-markdown';
import {FormsModule} from '@angular/forms';
import {MaterialModules} from '../../material.modules';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('CryptoRS256Component', () => {
  let component: CryptoRS256Component;
  let fixture: ComponentFixture<CryptoRS256Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FormsModule,
        MaterialModules,
        HttpClientTestingModule,
        MarkdownModule.forRoot()
      ],
      declarations: [CryptoRS256Component]
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
