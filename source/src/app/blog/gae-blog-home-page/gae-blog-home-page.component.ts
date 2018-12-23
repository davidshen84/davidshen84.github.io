import {Component, OnInit} from '@angular/core';
import {BlogMeta, GaeBlogService} from '../gae-blog-page/gae-blog.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-gae-blog-home-page',
  templateUrl: './gae-blog-home-page.component.html',
  styleUrls: ['./gae-blog-home-page.component.scss']
})
export class GaeBlogHomePageComponent implements OnInit {

  public blogs$: Observable<BlogMeta[]>;

  constructor(private gaeBlog: GaeBlogService) {
    this.blogs$ = gaeBlog.getBlogs();
  }

  ngOnInit() {
  }

}
