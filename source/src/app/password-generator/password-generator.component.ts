import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { flatMap, map, repeat, scan, startWith } from 'rxjs/operators';
import { TitleService } from '../title.service';
import { GaService } from '../ga.service';
import { BaseComponent } from '../base-component';


@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.scss'],
  providers: [GaService]
})
export class PasswordGeneratorComponent extends BaseComponent implements OnInit {
  private static readonly prime: number = 21001;

  public isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches));
  LowerCaseControl = new FormControl(true);
  UpperCaseControl = new FormControl(true);
  DigitControl = new FormControl(true);
  SpecialControl = new FormControl(true);
  GenerateSubject = new BehaviorSubject(undefined);
  // Default length of characters to generate.
  private length = 16;
  SliderControl = new FormControl(this.length);
  public result$ = combineLatest([
    this.GenerateSubject,
    this.SliderControl.valueChanges.pipe(
      startWith(this.length)
    ),
    this.LowerCaseControl.valueChanges.pipe(
      startWith(true),
      map(x => x ? 'abcdefghijklmnopqrstuvwxyz' : ''),
    ),
    this.UpperCaseControl.valueChanges.pipe(
      startWith(true),
      map(x => x ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : ''),
    ),
    this.DigitControl.valueChanges.pipe(
      startWith(true),
      map(x => x ? '0123456789' : '')
    ),
    this.SpecialControl.valueChanges.pipe(
      startWith(true),
      map(x => x ? '\`~!@#$%^&*()_+-={}|[]\\:";\'<>?,./' : '')
    )
  ]).pipe(
    map(([ignore, n, ...args]) => [n, args.reduce((p, c) => p.concat(c), '')]),
    flatMap(([n, x]) => of(x).pipe(
      // pick one character
      map(y => y.length > 0
        ? y[Math.ceil(Math.random() * PasswordGeneratorComponent.prime) % y.length]
        : '😂'),
      repeat(n),
      scan((acc: string, value: string) => acc + value, ''))));

  constructor(titleService: TitleService,
              ga: GaService,
              private breakpointObserver: BreakpointObserver,
              private matSnackBar: MatSnackBar) {
    super(ga);
    titleService.setTitle('Password Generator');
  }

  ngOnInit() {
  }

  public openSnackBar = () => this.matSnackBar.open('Copied to clipboard!', '😆', {duration: 500});

}
