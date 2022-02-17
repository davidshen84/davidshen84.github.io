import {
  Component,
  OnDestroy,
  OnInit,
  Pipe,
  PipeTransform,
} from '@angular/core';
import {
  BehaviorSubject,
  interval,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

const ONE_SECOND = 1000; // milliseconds
const ONE_MINUTE = 60; // seconds

const POMODORO_SIZE_SEQUENCES = {
  five: [5, 10, 15, 20, 25],
  fib: [5, 8, 13, 21, 34], // fibonacci
  prime: [5, 11, 17, 23, 31],
};

interface Pomodoro {
  seconds: number;
  note?: string;
}

const RottenPomodoro: Pomodoro = {
  seconds: 0,
};

/** Pipe to format a number into the 'mm:ss' time format
 */
@Pipe({ name: 'pomodoroTime' })
export class PomodoroTimePipe implements PipeTransform {
  transform(value: number): string {
    return moment(value * ONE_SECOND).format('mm:ss');
  }
}

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.scss'],
})
export class PomodoroComponent implements OnInit, OnDestroy {
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  public finishedPomodoroStack = new Array<Pomodoro>();
  public clock$ = new Subject<number>();
  public note$ = new Subject<string>();
  public pomodoroSequenceChanged = new BehaviorSubject<MatButtonToggleChange>({
    value: 'five',
    source: undefined,
  });

  public selectedPomodoroSequence$ = this.pomodoroSequenceChanged.pipe(
    map((e) => e.value),
    map((v) => POMODORO_SIZE_SEQUENCES[v]),
  );
  public pomodoroStack = new Array<Pomodoro>();
  private pomodoroTrigger$ = new Subject();
  private pomodoroFinished$ = new Subject<Pomodoro>();

  // main loop that consumes a 🍅
  private pomodoroLoop$ = this.pomodoroTrigger$.pipe(
    filter(() => this.pomodoroStack.length > 0),
    map(() => this.pomodoroStack.shift() || RottenPomodoro),
    // update message card
    tap((p) => {
      this.clock$.next(p.seconds);
      this.note$.next(p.note);
    }),
    switchMap(({ seconds, note }) =>
      interval(ONE_SECOND).pipe(
        take(seconds),
        tap((c) => {
          this.clock$.next(seconds - c - 1);
          // reset message card
          if (seconds - c - 1 === 0) this.note$.next(null);
        }),
        filter((c) => c + 1 === seconds),
        map(() => this.pomodoroFinished$.next({ seconds, note })),
      ),
    ),
  );
  private pomodoroSubscription: Subscription;
  private pomodoroFinishedSubscription: Subscription;
  private pomodoroLoopRunning = false;
  private notificationPermission: 'default' | 'denied' | 'granted';

  constructor(
    private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
  ) {}

  async ngOnInit() {
    try {
      this.notificationPermission = await Notification.requestPermission();
    } catch {
      this.notificationPermission = 'default';
    }

    this.pomodoroSubscription = this.pomodoroLoop$.subscribe(() => {
      this.pomodoroTrigger$.next();
    });

    this.pomodoroFinishedSubscription = this.pomodoroFinished$.subscribe(
      (p) => {
        if (this.pomodoroStack.length === 0) {
          this.pomodoroLoopRunning = false;
        }
        this.finishedPomodoroStack.unshift(p);

        if (this.notificationPermission === 'granted') {
          new Notification('Pomodoro Finished', {
            body: p.note,
          });
        }
      },
    );
  }

  ngOnDestroy(): void {
    this.pomodoroSubscription?.unsubscribe();
    this.pomodoroFinishedSubscription?.unsubscribe();
  }

  addPomodoro(value: number, note: string): void {
    const minutes = value * ONE_MINUTE;
    note = note === '' ? '🍅' : note;
    this.pomodoroStack.push({
      seconds: minutes,
      note: note,
    });

    this.snackBar.open(`Added a 🍅 for ${note}`, undefined, {
      duration: ONE_SECOND,
    });
    if (!this.pomodoroLoopRunning) {
      this.pomodoroLoopRunning = true;
      this.pomodoroTrigger$.next();
    }
  }

  public calcPomodoroFontSize(x: number) {
    return Math.log2(x);
  }
}