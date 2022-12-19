import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  public title$: Observable<string>;

  public pubKey = '7E927F94CC52AA1A';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _titleService: TitleService,
  ) {
    this.title$ = this._titleService.getTitle();
  }
}
