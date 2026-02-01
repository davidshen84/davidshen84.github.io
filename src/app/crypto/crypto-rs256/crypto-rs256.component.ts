import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { TitleService } from '../../title.service';
import { RS256CryptoService } from '../rs256-crypto.service';
import { StringUtilityService } from '../string.utility';
import { GaService } from '../../ga.service';
import { BaseComponent } from '../../base-component';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RemarkableComponent } from '../../remarkable/remarkable.component';

@Component({
  selector: 'app-crypto-rs256',
  templateUrl: './crypto-rs256.component.html',
  styleUrls: ['./crypto-rs256.component.scss'],
  providers: [GaService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RemarkableComponent,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    TextFieldModule,
    MatInputModule,
  ],
})
export class CryptoRS256Component extends BaseComponent {
  private cryptoService = inject(RS256CryptoService);
  private titleService = inject(TitleService);
  private strUtlSvc = inject(StringUtilityService);

  // Define header
  public header = signal(
    JSON.stringify(
      {
        alg: 'RS256',
        typ: 'JWT',
      },
      null,
      2,
    ),
  );

  public encodedHeader = computed(() => {
    const encoded = this.strUtlSvc.EncodeString(this.header());
    const str = String.fromCharCode(...Array.from(encoded));
    return this.strUtlSvc.Base64UrlEncode(str);
  });

  // Define payload
  public payload = signal(
    JSON.stringify(
      {
        sub: '1234567890',
        name: 'John Doe',
        admin: true,
        iat: 1516239022,
      },
      null,
      2,
    ),
  );

  public encodedPayload = computed(() => {
    const encoded = this.strUtlSvc.EncodeString(this.payload());
    const str = String.fromCharCode(...Array.from(encoded));
    return this.strUtlSvc.Base64UrlEncode(str);
  });

  // Define private key
  public privateKeyInput = signal('');

  // Define signature
  public signature = signal('');

  // Define JWT
  public jwt = computed(() => {
    const sig = this.signature();
    if (!sig || sig === '') {
      return '';
    }
    return `${this.encodedHeader()}.${this.encodedPayload()}.${sig}`;
  });

  constructor() {
    const ga = inject(GaService);

    super(ga);

    this.titleService.setTitle('Encryption using RS256');

    // Effect to compute signature when inputs change
    effect(() => {
      const h = this.encodedHeader();
      const p = this.encodedPayload();
      const k = this.privateKeyInput();

      if (k) {
        this.cryptoService
          .sign(k, `${h}.${p}`)
          .then((sig) => this.signature.set(sig))
          .catch(() => this.signature.set(''));
      } else {
        this.signature.set('');
      }
    });
  }
}
