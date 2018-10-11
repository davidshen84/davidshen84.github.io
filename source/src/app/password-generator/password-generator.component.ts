import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, of, fromEvent, merge } from 'rxjs';
import { map, scan, repeat, startWith } from 'rxjs/operators';
import { MatButton, MatSnackBar, MatSlider, MatCheckbox } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.scss']
})
export class PasswordGeneratorComponent implements OnInit {
  private static readonly prime: number = 21001;

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches));

  public result$: Observable<Observable<string>>;

  // Default length of characters to generate.
  public Length = 6;

  // Turn on all character types by default.
  public HasLowerCases = true;
  public HasUpperCases = true;
  public HasDigits = true;
  public HasSpecials = true;

  @ViewChild('generate')
  private _button: MatButton;

  @ViewChild('lowerCases')
  private _checkboxLowerCases: MatCheckbox;

  @ViewChild('upperCases')
  private _checkboxUpperCases: MatCheckbox;

  @ViewChild('digits')
  private _checkboxDigits: MatCheckbox;

  @ViewChild('specials')
  private _checkboxSpecials: MatCheckbox;

  @ViewChild('slider')
  private _slider: MatSlider;

  constructor(private breakpointObserver: BreakpointObserver, private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.result$ = merge(fromEvent(this._button._elementRef.nativeElement, 'click'),
                         this._checkboxDigits.change,
                         this._checkboxLowerCases.change,
                         this._checkboxUpperCases.change,
                         this._checkboxSpecials.change,
                         this._slider.input,
                        ).pipe(
                          startWith(undefined),
                          map(_ => of(''
                                      + (this.HasLowerCases ? 'abcdefghijklmnopqrstuvwxyz' : '')
                                      + (this.HasUpperCases ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '')
                                      + (this.HasDigits ? '0123456789' : '')
                                      + (this.HasSpecials ? '`~!@#$%^&*()_+-={}|[]\\:";\'<>?,./' : '')).pipe(
                                        map(s => this.pickOne(s) || '😂'),
                                        repeat(this._slider.value),
                                        scan((acc: string, value: string) => acc + value, ''))));
  }

  public openSnackBar = () => this.matSnackBar.open('Copied to clipboard!', '😆', {duration: 500});

  private pickOne = (s: string): string => (s && s.length > 0)
    ? s[Math.ceil(Math.random() * PasswordGeneratorComponent.prime) % s.length]
    : null
}
