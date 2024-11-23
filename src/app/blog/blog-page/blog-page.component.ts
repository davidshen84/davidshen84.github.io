import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TitleService } from '../../title.service';
import { GaService } from '../../ga.service';
import { BaseComponent } from '../../base-component';
import { AsyncPipe } from '@angular/common';
import { RemarkableComponent } from '../../remarkable/remarkable.component';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
  imports: [RemarkableComponent, AsyncPipe],
})
export class BlogPageComponent extends BaseComponent implements OnDestroy {
  public blogPath$: Observable<string>;
  private _paramIdSubscriptions: Subscription[] = [];
  private _paramId$: Observable<string>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _titleService: TitleService,
    ga: GaService,
  ) {
    super(ga);
    this._paramId$ = this._route.params.pipe(map((p) => p['id']));

    this._paramIdSubscriptions.push(
      this._paramId$
        .pipe(
          filter((p) => p !== undefined),
          map((p) => p.replace(/-/g, ' ')),
        )
        .subscribe((t) => this._titleService.setTitle(t)),
    );
    this.blogPath$ = this._paramId$.pipe(map((p) => `assets/blogs/${p}.md`));
  }

  ngOnDestroy() {
    if (this._paramIdSubscriptions.length > 0) {
      this._paramIdSubscriptions.forEach((s) => s.unsubscribe());
    }
  }

  onBlogLoadError(_: string) {
    this._paramIdSubscriptions.push(
      this._paramId$.subscribe((id) =>
        this._router.navigate(['blog/notfound', id]),
      ),
    );
  }
}
