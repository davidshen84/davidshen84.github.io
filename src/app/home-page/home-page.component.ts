import { Component, inject } from '@angular/core';
import { TitleService } from '../title.service';
import { RemarkableComponent } from '../remarkable/remarkable.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [RemarkableComponent],
})
export class HomePageComponent {
  private _titleService = inject(TitleService);

  constructor() {
    this._titleService.setTitle('Welcome to my blog 😎');
  }
}
