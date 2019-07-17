import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../title.service';

@Component({
  selector: 'app-blog-home-page',
  templateUrl: './blog-home-page.component.html',
  styleUrls: ['./blog-home-page.component.scss']
})
export class BlogHomePageComponent implements OnInit {

  constructor(private _titleService: TitleService) {
    _titleService.setTitle('Blog Home');
  }

  ngOnInit() {
  }

}
