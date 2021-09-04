import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../title.service';
import { GaService } from '../../ga.service';

@Component({
  selector: 'app-blog-home-page',
  templateUrl: './blog-home-page.component.html',
  styleUrls: ['./blog-home-page.component.scss'],
  providers: [GaService],
})
export class BlogHomePageComponent implements OnInit {
  constructor(private _titleService: TitleService) {}

  ngOnInit(): void {
    this._titleService.setTitle('Blog Home');
  }
}
