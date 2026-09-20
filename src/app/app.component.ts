import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { GaService } from './ga.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GaService],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NavComponent],
})
export class AppComponent {}
