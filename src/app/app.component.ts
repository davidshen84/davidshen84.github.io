import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { GaService } from './ga.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  providers: [GaService],
  imports: [NavComponent],
})
export class AppComponent {}
