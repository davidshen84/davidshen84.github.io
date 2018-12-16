import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CryptoRS256Component} from './crypto-rs256.component';

describe('CryptoRS256Component', () => {
  let component: CryptoRS256Component;
  let fixture: ComponentFixture<CryptoRS256Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
