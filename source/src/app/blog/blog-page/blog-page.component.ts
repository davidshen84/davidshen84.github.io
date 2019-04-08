import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {TitleService} from '../../title.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit, OnDestroy {
  public blogPath$: Observable<string>;
  private _paramIdSubscriptions: Subscription[] = new Array<Subscription>();
  private _paramId$: Observable<string>;

  constructor(private _route: ActivatedRoute, private _router: Router, private _titleService: TitleService) {
    this._paramId$ = this._route.params.pipe(
      map(p => p['id'])
    );

    this._paramIdSubscriptions.push(this._paramId$.pipe(
      filter(p => p !== undefined),
      map(p => p.replace(/-/g, ' '))
    ).subscribe(this._titleService.setTitle));

    this.blogPath$ = this._paramId$.pipe(
      map(p => `assets/blogs/${p}.md`),
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this._paramIdSubscriptions.length > 0) {
      this._paramIdSubscriptions.forEach(s => s.unsubscribe());
    }
  }

  onBlogLoadError(event: HttpErrorResponse) {
    this._paramIdSubscriptions.push(
      this._paramId$.subscribe(id => this._router.navigate(['blog/notfound', id]))
    );
  }
}
