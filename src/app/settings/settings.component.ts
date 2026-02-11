import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RS256CryptoService } from '../crypto/rs256-crypto.service';
import { TitleService } from '../title.service';
import { LocalStorageService } from 'ngx-webstorage';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';

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
  ],
})
export class SettingsComponent {
  private _cryptoService = inject(RS256CryptoService);
  private _snackBar = inject(MatSnackBar);
  private _title = inject(TitleService);
  private _localStorage = inject(LocalStorageService);

  public privateKey = signal(this._localStorage.retrieve(KEY_NAME));

  public keySaved = signal(false);

  constructor() {
    this._title.setTitle('Settings');

    effect(async () => {
      const pk = this.privateKey();

      await this._cryptoService.importKey(pk).then(
        () => {
          this._localStorage.store(KEY_NAME, pk);
          this.keySaved.set(true);
        },

        (r: Error) => {
          this._localStorage.store(KEY_NAME, '');
          this._snackBar.open(r.message, '❌', { duration: 1000 });
          this.keySaved.set(false);
        },
      );
    });
  }
}
