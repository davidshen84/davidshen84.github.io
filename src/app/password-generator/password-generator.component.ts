import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleService } from '../title.service';
import { GaService } from '../ga.service';
import { BaseComponent } from '../base-component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

const prime = 21001;

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.scss'],
  providers: [GaService],
  imports: [
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatTooltipModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ClipboardModule,
    FormsModule,
  ],
})
export class PasswordGeneratorComponent extends BaseComponent {
  private _titleService = inject(TitleService);
  private breakpointObserver = inject(BreakpointObserver);
  private _matSnackBar = inject(MatSnackBar);

  public isHandset = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset),
    {
      initialValue: { matches: false, breakpoints: {} },
    },
  );

  public lowerCaseInput = signal(true);

  public digitInput = signal(true);

  public specialInput = signal(true);

  public upperCaseInput = signal(true);

  public sliderInput = signal(16);

  public generateInput = signal(<MouseEvent>(<unknown>null));

  public result_ = computed(() => {
    void this.generateInput();
    const length = this.sliderInput();

    const pool = [
      this.lowerCaseInput() ? 'abcdefghijklmnopqrstuvwxyz' : '',
      this.upperCaseInput() ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '',
      this.digitInput() ? '0123456789' : '',
      this.specialInput() ? '`~!@#$%^&*()_+-={}|[]\\:";\'<>?,./' : '',
    ].join('');

    let result = '';
    for (let i = 0; i < length; i++) {
      if (pool.length > 0) {
        const idx = Math.ceil(Math.random() * prime) % pool.length;
        result += pool[idx];
      } else {
        result += '😂';
      }
    }
    return result;
  });

  constructor() {
    const ga = inject(GaService);

    super(ga);
    this._titleService.setTitle('Password Generator');
  }

  public openSnackBar() {
    return this._matSnackBar.open('Copied to clipboard!', '😆', {
      duration: 500,
    });
  }
}
