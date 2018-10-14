import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {Blog, GaeBlogService} from './gae-blog.service';
import {TitleService} from '../title.service';

@Component({
  selector: 'app-gae-blog-page',
  templateUrl: './gae-blog-page.component.html',
  styleUrls: ['./gae-blog-page.component.scss']
})
export class GaeBlogPageComponent implements OnInit, OnDestroy {

  public blog$: Observable<Blog>;
  public blogContent$: Observable<string>;
  private setTitleSubscription: Subscription;

  constructor(private route: ActivatedRoute, private gaeBlogService: GaeBlogService, private titleService: TitleService) {
  }

  ngOnInit() {
    this.blog$ = this.route.params.pipe(
      map(p => p['id']),
      flatMap(urlsafe => this.gaeBlogService.getBlog(urlsafe)),
    );

    this.blogContent$ = this.blog$.pipe(
      map(b => b.content)
    );

    this.setTitleSubscription = this.blog$.subscribe(b => this.titleService.setTitle(b.title));
  }

  ngOnDestroy(): void {
    if (this.setTitleSubscription !== undefined) {
      this.setTitleSubscription.unsubscribe();
    }
  }

}
