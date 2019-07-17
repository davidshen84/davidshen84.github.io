import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { flatMap, map, repeat, scan, startWith } from 'rxjs/operators';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSlider } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TitleService } from '../title.service';


@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.scss']
})
export class PasswordGeneratorComponent implements OnInit {
  private static readonly prime: number = 21001;

  public isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches));

  public result$: Observable<string>;

  // Default length of characters to generate.
  public Length = 16;

  // Turn on all character types by default.
  public HasLowerCases = true;
  public HasUpperCases = true;
  public HasDigits = true;
  public HasSpecials = true;

  @ViewChild('generate', {static: true})
  private _button: MatButton;

  @ViewChild('lowerCases', {static: true})
  private _checkboxLowerCases: MatCheckbox;

  @ViewChild('upperCases', {static: true})
  private _checkboxUpperCases: MatCheckbox;

  @ViewChild('digits', {static: true})
  private _checkboxDigits: MatCheckbox;

  @ViewChild('specials', {static: true})
  private _checkboxSpecials: MatCheckbox;

  @ViewChild('slider', {static: true})
  private _slider: MatSlider;

  constructor(titleService: TitleService,
              private _breakpointObserver: BreakpointObserver,
              private _matSnackBar: MatSnackBar) {
    titleService.setTitle('Password Generator');
  }

  ngOnInit() {
    this.result$ = merge(fromEvent(this._button._elementRef.nativeElement, 'click'),
      this._checkboxDigits.change,
      this._checkboxLowerCases.change,
      this._checkboxUpperCases.change,
      this._checkboxSpecials.change,
      this._slider.input,
    ).pipe(
      startWith('🔑'),
      flatMap(_ =>
        of(this.buildDictionary()).pipe(
          map(s => this.pickOne(s) || '😂'),
          repeat(this._slider.value),
          scan((acc: string, value: string) => acc + value, ''))));
  }

  public openSnackBar = () => this._matSnackBar.open('Copied to clipboard!', '😆', {duration: 500});

  private buildDictionary() {
    return `\
${this.HasLowerCases ? 'abcdefghijklmnopqrstuvwxyz' : ''}\
${this.HasUpperCases ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : ''}\
${this.HasDigits ? '0123456789' : ''}\
${this.HasSpecials ? '\`~!@#$%^&*()_+-={}|[]\\:";\'<>?,./' : ''}`;
  }

  private pickOne = (s: string): string => (s && s.length > 0)
    ? s[Math.ceil(Math.random() * PasswordGeneratorComponent.prime) % s.length]
    : null
}
