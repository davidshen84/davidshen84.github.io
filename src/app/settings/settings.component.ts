import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { merge, Observable, of, Subject } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { filter, mergeMap } from 'rxjs/operators';
import { RS256CryptoService } from '../crypto/rs256-crypto.service';
import { TitleService } from '../title.service';
import { LocalStorage } from 'ngx-webstorage';

const KEY_NAME = 'private-key';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  @LocalStorage(KEY_NAME, '')
  public pkInput: string;
  public pkChangedSubject: Subject<string> = new Subject<string>();
  public cryptoKey$: Observable<boolean>;

  constructor(
    private _cryptoService: RS256CryptoService,
    private _snackBar: MatSnackBar,
    private _title: TitleService,
  ) {
    this._title.setTitle('Settings');
  }

  ngOnInit() {
    this.cryptoKey$ = merge(of(this.pkInput), this.pkChangedSubject).pipe(
      filter((x) => !!x),
      mergeMap((key) =>
        fromPromise(
          this._cryptoService.importKey(key).then(
            () => {
              return !!(this.pkInput = key);
            },
            (r: Error) => {
              this._snackBar.open(r.message, '❌', { duration: 1000 });
              return false;
            },
          ),
        ),
      ),
    );
  }
}
