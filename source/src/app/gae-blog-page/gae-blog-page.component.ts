import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {Blog, GaeBlogService} from './gae-blog.service';

@Component({
  selector: 'app-gae-blog-page',
  templateUrl: './gae-blog-page.component.html',
  styleUrls: ['./gae-blog-page.component.scss']
})
export class GaeBlogPageComponent implements OnInit {

  public blog$: Observable<Blog>;

  constructor(private route: ActivatedRoute, private gaeBlogService: GaeBlogService) {
  }

  ngOnInit() {
    this.blog$ = this.route.params.pipe(
      map(p => p['id']),
      flatMap(urlsafe => this.gaeBlogService.GetBlog(urlsafe))
    );
  }

}
