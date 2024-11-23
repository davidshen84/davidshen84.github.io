import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TitleService } from '../title.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgIf, TitleCasePipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    RouterLink,
    QRCodeComponent,
    NgIf,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    AsyncPipe,
    TitleCasePipe,
  ],
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
