import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TitleService } from '../../title.service';
import { GaService } from '../../ga.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-blog-home-page',
  templateUrl: './blog-home-page.component.html',
  styleUrls: ['./blog-home-page.component.scss'],
  providers: [GaService],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatListModule],
})
export class BlogHomePageComponent {
  private _titleService = inject(TitleService);

  constructor() {
    this._titleService.setTitle('Blog Home');
  }
}
