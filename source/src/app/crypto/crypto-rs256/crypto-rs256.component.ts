import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable, Subject } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { filter, flatMap, map, mapTo, share } from 'rxjs/operators';
import { TitleService } from '../../title.service';
import { RS256CryptoService } from '../rs256-crypto.service';
import { StringUtilityService } from '../string.utility';
import { GaService } from '../../ga.service';
import { BaseComponent } from '../../base-component';


@Component({
  selector: 'app-crypto-rs256',
  templateUrl: './crypto-rs256.component.html',
  styleUrls: ['./crypto-rs256.component.scss'],
  providers: [GaService]
})
export class CryptoRS256Component extends BaseComponent implements OnInit {

  // Define header
  public header = JSON.stringify({
    'alg': 'RS256',
    'typ': 'JWT'
  }, null, 2);
  public headerSubject = new BehaviorSubject<string>(this.header);
  public encodedHeader$ = this.headerSubject.pipe(
    map(s => this.strUtlSvc.EncodeString(s)),
    map(a => String.fromCharCode(...Array.from(a))),
    map(this.strUtlSvc.Base64UrlEncode)
  );
  // Define payload
  public payload = JSON.stringify({
    'sub': '1234567890',
    'name': 'John Doe',
    'admin': true,
    'iat': 1516239022
  }, null, 2);
  public payloadSubject = new BehaviorSubject<string>(this.payload);
  public encodedPayload$ = this.payloadSubject.pipe(
    map(s => this.strUtlSvc.EncodeString(s)),
    map(a => String.fromCharCode(...Array.from(a))),
    map(this.strUtlSvc.Base64UrlEncode)
  );

  // Define private key
  public privateKeyInput: string;
  public privateKeyInputSubject = new Subject<string>();

  // Define signature
  public signature$ = combineLatest([this.encodedHeader$, this.encodedPayload$, this.privateKeyInputSubject]).pipe(
    flatMap(([h, p, k]) => fromPromise(this.cryptoService.sign(k, `${h}.${p}`)
      .then(undefined, () => ''))),
    share()
  );

  // Define JWT
  public jwt$: Observable<string> = merge(
    combineLatest([this.encodedHeader$, this.encodedPayload$, this.signature$]).pipe(
      filter(([_, __, s]) => s && s !== ''),
      map(([h, p, s]) => `${h}.${p}.${s}`)
    ),
    this.signature$.pipe(
      filter(s => !s),
      mapTo('')
    )
  );

  constructor(private cryptoService: RS256CryptoService, private titleService: TitleService,
              private strUtlSvc: StringUtilityService, ga: GaService) {
    super(ga);
  }

  ngOnInit() {
    this.titleService.setTitle('Encryption using RS256');
  }

}
