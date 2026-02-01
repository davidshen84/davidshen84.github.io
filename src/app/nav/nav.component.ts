import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TitleService } from '../title.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TitleCasePipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { QRCodeComponent } from 'angularx-qrcode';
import { toSignal } from '@angular/core/rxjs-interop';

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
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    TitleCasePipe,
  ],
})
export class NavComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private _titleService = inject(TitleService);

  public isHandset = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset),
    {
      initialValue: { matches: false, breakpoints: {} },
    },
  );

  public title = this._titleService.title;

  public pubKey = '7E927F94CC52AA1A';
}
