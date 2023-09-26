import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

declare function ga(...args: any): void;

@Injectable()
export class GaService {
  private done$ = new Subject();

  constructor(private router: Router) {}

  SetPageView(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => e as NavigationEnd),
        takeUntil(this.done$),
      )
      .subscribe((event: NavigationEnd) => {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
        this.done$.next();
        this.done$.complete();
      });
  }
}
