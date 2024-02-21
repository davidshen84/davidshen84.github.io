import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { filter, map, mergeMap, repeat, scan, startWith } from 'rxjs/operators';
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
  standalone: true,
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
  ],
})
export class PasswordGeneratorComponent extends BaseComponent {
  public isHandset$ = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));
  LowerCaseControl = new UntypedFormControl(true);
  UpperCaseControl = new UntypedFormControl(true);
  DigitControl = new UntypedFormControl(true);
  SpecialControl = new UntypedFormControl(true);
  GenerateSubject = new BehaviorSubject(undefined);
  // Default length of characters to generate.
  private length = 16;
  SliderControl = new UntypedFormControl(this.length);
  public result$ = combineLatest([
    this.GenerateSubject,
    this.SliderControl.valueChanges.pipe(startWith(this.length)),
    this.LowerCaseControl.valueChanges.pipe(
      startWith(true),
      map((x) => (x ? 'abcdefghijklmnopqrstuvwxyz' : '')),
    ),
    this.UpperCaseControl.valueChanges.pipe(
      startWith(true),
      map((x) => (x ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '')),
    ),
    this.DigitControl.valueChanges.pipe(
      startWith(true),
      map((x) => (x ? '0123456789' : '')),
    ),
    this.SpecialControl.valueChanges.pipe(
      startWith(true),
      map((x) => (x ? '`~!@#$%^&*()_+-={}|[]\\:";\'<>?,./' : '')),
    ),
  ]).pipe(
    map(([, n, ...args]) => [
      n,
      args.reduce((p: string, c) => p.concat(c), ''),
    ]),
    mergeMap(([n, x]) =>
      of(x).pipe(
        // pick one character
        map((y: string) =>
          y.length > 0 ? y[Math.ceil(Math.random() * prime) % y.length] : '😂',
        ),
        repeat(n),
        scan((acc: string, value: string) => acc + value, ''),
        filter((s) => s.length == n),
      ),
    ),
  );

  constructor(
    ga: GaService,
    private _titleService: TitleService,
    private breakpointObserver: BreakpointObserver,
    private _matSnackBar: MatSnackBar,
  ) {
    super(ga);
    this._titleService.setTitle('Password Generator');
  }

  public openSnackBar() {
    return this._matSnackBar.open('Copied to clipboard!', '😆', {
      duration: 500,
    });
  }
}
