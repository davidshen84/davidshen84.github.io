import { Component } from '@angular/core';
import { TitleService } from '../../title.service';
import { GaService } from '../../ga.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-blog-home-page',
  templateUrl: './blog-home-page.component.html',
  styleUrls: ['./blog-home-page.component.scss'],
  providers: [GaService],
  imports: [MatListModule],
})
export class BlogHomePageComponent {
  constructor(private _titleService: TitleService) {
    this._titleService.setTitle('Blog Home');
  }
}
