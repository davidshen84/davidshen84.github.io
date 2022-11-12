import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

declare function ga(...args: any);

@Injectable()
export class GaService {
  private done$ = new Subject();

  constructor(private router: Router) {}

  SetPageView(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
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
