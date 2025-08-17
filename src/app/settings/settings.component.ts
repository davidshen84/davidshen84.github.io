import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { merge, Observable, of, Subject } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { RS256CryptoService } from '../crypto/rs256-crypto.service';
import { TitleService } from '../title.service';
import { LocalStorage } from 'ngx-webstorage';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

const KEY_NAME = 'private-key';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    AsyncPipe,
  ],
})
export class SettingsComponent implements OnInit {
  private _cryptoService = inject(RS256CryptoService);
  private _snackBar = inject(MatSnackBar);
  private _title = inject(TitleService);

  @LocalStorage(KEY_NAME, '')
  public pkInput: string = '';
  public pkChangedSubject: Subject<string> = new Subject<string>();
  public cryptoKey$!: Observable<boolean>;

  constructor() {
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
