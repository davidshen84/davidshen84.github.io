import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, computed, signal, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { filter, map, repeat, scan } from 'rxjs/operators';
import { TitleService } from '../title.service';
import { GaService } from '../ga.service';
import { BaseComponent } from '../base-component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsyncPipe } from '@angular/common';
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
    AsyncPipe,
    FormsModule,
  ],
})
export class PasswordGeneratorComponent extends BaseComponent {
  private _titleService = inject(TitleService);
  private breakpointObserver = inject(BreakpointObserver);
  private _matSnackBar = inject(MatSnackBar);

  public isHandset$ = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  public lowerCaseInput = signal(true);

  public digitInput = signal(true);

  public specialInput = signal(true);

  public upperCaseInput = signal(true);

  public sliderInput = signal(16);

  public generateInput = signal(<MouseEvent>(<unknown>null));

  public result_ = computed(() => {
    const length = this.sliderInput();

    return of([
      this.generateInput()?.toString(),
      this.lowerCaseInput() ? 'abcdefghijklmnopqrstuvwxyz' : '',
      this.upperCaseInput() ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '',
      this.digitInput() ? '0123456789' : '',
      this.specialInput() ? '`~!@#$%^&*()_+-={}|[]\\:";\'<>?,./' : '',
    ]).pipe(
      map(([, ...x]) => x.reduce((p, c) => `${p}${c}`)),
      // pick one character
      map((y: string) =>
        y.length > 0 ? y[Math.ceil(Math.random() * prime) % y.length] : '😂',
      ),
      repeat(length),
      scan((acc: string, value: string) => `${acc}${value}`, ''),
      // only return the last accumulated value
      filter((s) => s.length == length),
    );
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
