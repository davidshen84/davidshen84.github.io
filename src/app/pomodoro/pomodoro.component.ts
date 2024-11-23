import {
  Component,
  computed,
  OnDestroy,
  OnInit,
  Pipe,
  PipeTransform,
  signal,
} from '@angular/core';
import {
  BehaviorSubject,
  concatMap,
  interval,
  Observable,
  of,
  Subject,
  Subscription,
} from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitleService } from '../title.service';
import { MatLineModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AsyncPipe, NgFor, NgStyle } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { format } from 'date-fns/fp/format';
import { addMilliseconds } from 'date-fns';
import { curry, flip } from 'rambda/immutable';

const ONE_SECOND = 1_000; // milliseconds
const ONE_MINUTE = 60; // seconds

const POMODORO_SIZE_SEQUENCES: { [key: string]: number[] } = {
  five: [5, 10, 15, 20, 25],
  fib: [5, 8, 13, 21, 34], // fibonacci
  prime: [5, 11, 17, 23, 31],
};

interface Pomodoro {
  seconds: number;
  note?: string;
}

/** Pipe to format a number into the 'mm:ss' time format
 */
@Pipe({
  name: 'pomodoroTime',
  standalone: true,
})
export class PomodoroTimePipe implements PipeTransform {
  private formatter = format('mm:ss');
  private addToMilliseconds = curry(flip(addMilliseconds))(0);

  transform(value: number): string {
    return this.formatter(this.addToMilliseconds(value * ONE_SECOND));
  }
}

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss'],
  imports: [
    MatCardModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    NgFor,
    MatTooltipModule,
    NgStyle,
    MatGridListModule,
    MatListModule,
    MatLineModule,
    AsyncPipe,
    PomodoroTimePipe,
  ],
})
export class PomodoroComponent implements OnInit, OnDestroy {
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  public freshPomodoroBasket = signal(new Array<Pomodoro>());
  public totalFreshPomodoroTime = computed(() =>
    this.freshPomodoroBasket().reduce((p, c) => p + c.seconds, 0),
  );
  public rottenPomodoroBasket = signal(new Array<Pomodoro>());
  public totalRottenPomodoroTime = computed(() =>
    this.rottenPomodoroBasket().reduce((p, c) => p + c.seconds, 0),
  );

  public clock$ = new Subject<number>();
  public note$ = new Subject<string>();
  public pomodoroSequenceChanged = new BehaviorSubject<string>('five');

  public selectedPomodoroSequence$ = this.pomodoroSequenceChanged.pipe(
    map((v) => POMODORO_SIZE_SEQUENCES[v]),
  );

  public newPomodoro$ = new Subject<Pomodoro>();
  private rottenPomodoro$ = new Subject<Pomodoro>();

  private pomodoroLoop$ = this.newPomodoro$.pipe(
    tap((p) => this.freshPomodoroBasket.update((v) => [...v, p])),
    concatMap(({ seconds, note }) =>
      of(undefined).pipe(
        tap(() =>
          this.freshPomodoroBasket.update((v) => v.filter((_, i) => i > 0)),
        ),
        switchMap(() =>
          // main loop that consumes a 🍅
          interval(ONE_SECOND).pipe(
            take(seconds),
            tap((c) => {
              this.clock$.next(seconds - c - 1);
              // reset message card
              if (seconds - c - 1 === 0) this.note$.next('');
            }),
            filter((c) => c + 1 === seconds),
            tap(() => this.rottenPomodoro$.next({ seconds, note })),
          ),
        ),
      ),
    ),
  );

  private pomodoroSubscription!: Subscription;
  private pomodoroFinishedSubscription!: Subscription;
  private notificationPermission: 'default' | 'denied' | 'granted' = 'default';

  constructor(
    private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    _titleService: TitleService,
  ) {
    _titleService.setTitle('🍅 Pomodoro 🍅');
  }

  async ngOnInit() {
    try {
      this.notificationPermission = await Notification.requestPermission();
    } catch {
      this.notificationPermission = 'default';
    }

    // start the loop
    this.pomodoroSubscription = this.pomodoroLoop$.subscribe();

    this.pomodoroFinishedSubscription = this.rottenPomodoro$.subscribe((p) => {
      this.rottenPomodoroBasket.update((value) => [p, ...value]);

      if (this.notificationPermission === 'granted') {
        new Notification('Pomodoro Finished', {
          body: p.note,
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.pomodoroSubscription?.unsubscribe();
    this.pomodoroFinishedSubscription?.unsubscribe();
  }

  public addPomodoro(value: number, note: string): void {
    const minutes = value * ONE_MINUTE;
    note = note === '' ? '🍅' : note;

    this.newPomodoro$.next({
      seconds: minutes,
      note: note,
    });

    this.snackBar.open(`Added a 🍅 for ${note}`, undefined, {
      duration: ONE_SECOND,
    });
  }

  public calcPomodoroFontSize(x: number) {
    return Math.log2(x);
  }
}
