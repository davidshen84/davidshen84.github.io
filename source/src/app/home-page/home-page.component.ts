import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private _titleService: TitleService) { }

  ngOnInit() {
    this._titleService.setTitle('Welcome to my blog 😎');
  }

}
