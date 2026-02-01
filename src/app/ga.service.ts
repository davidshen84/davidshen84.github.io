import { NavigationEnd, Router, Event as RouterEvent } from '@angular/router';
import { Injectable, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

declare function ga(...args: any): void;

@Injectable()
export class GaService {
  private router = inject(Router);
  private done = signal<boolean>(true);

  private readonly routerEvent = toSignal(this.router.events, {
    initialValue: null as unknown as RouterEvent,
  });

  constructor() {}

  SetPageView(): void {
    this.done.set(false);
  }

  // Effect reacts to router events and sends GA pageview once when done.
  // noinspection JSUnusedLocalSymbols
  private readonly _effect = effect(() => {
    const event = this.routerEvent();
    if (this.done()) return;
    if (event instanceof NavigationEnd) {
      ga('set', 'page', event.urlAfterRedirects);
      ga('send', 'pageview');
      this.done.set(true);
    }
  });
}
