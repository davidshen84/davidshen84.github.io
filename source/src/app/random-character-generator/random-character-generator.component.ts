import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, of, fromEvent } from 'rxjs';
import { map, scan, filter, repeat } from 'rxjs/operators';
import { MatButton, MatSnackBar } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-random-character-generator',
  templateUrl: './random-character-generator.component.html',
  styleUrls: ['./random-character-generator.component.scss']
})
export class RandomCharacterGeneratorComponent implements OnInit {
  private static readonly prime: number = 21001;

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches));

  public result$: Observable<Observable<string>>;
  public Count: number = 6;
  public HasLowerCases: boolean = true;
  public HasUpperCases: boolean = true;
  public HasDigits: boolean = true;
  public HasSpecials: boolean = true;

  @ViewChild('generate', {read: ElementRef})
  private _button: ElementRef;

  constructor(private breakpointObserver: BreakpointObserver, private matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.result$ = fromEvent(this._button.nativeElement, 'click').pipe(
      filter(_ => this.HasDigits || this.HasLowerCases || this.HasSpecials || this.HasUpperCases),
      map(_ => of(''
                  + (this.HasLowerCases ? 'abcdefghijklmnopqrstuvwxyz' : '')
                  + (this.HasUpperCases ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '')
                  + (this.HasDigits ? '0123456789' : '')
                  + (this.HasSpecials ? '`~!@#$%^&*()_+-={}|[]\\:";\'<>?,./' : '')).pipe(
                    map(s => s[Math.ceil(Math.random() * RandomCharacterGeneratorComponent.prime) % s.length]),
                    repeat(this.Count),
                    scan((acc: string, value: string) => acc + value, '')))
    );
  }

  public openSnackBar() {
    this.matSnackBar.open('Copied to clipboard!', '😆', {duration: 500});
  }

}
