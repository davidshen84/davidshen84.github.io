import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TitleService } from '../../title.service';
import { GaService } from '../../ga.service';
import { BaseComponent } from '../../base-component';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
  providers: [GaService]
})
export class BlogPageComponent extends BaseComponent implements OnInit, OnDestroy {
  public blogPath$: Observable<string>;
  private _paramIdSubscriptions: Subscription[] = new Array<Subscription>();
  private _paramId$: Observable<string>;

  constructor(private route: ActivatedRoute,
              private router: Router, titleService: TitleService,
              ga: GaService) {
    super(ga);

    this._paramId$ = this.route.params.pipe(
      map(p => p['id'])
    );

    this._paramIdSubscriptions.push(this._paramId$.pipe(
      filter(p => p !== undefined),
      map(p => p.replace(/-/g, ' '))
    ).subscribe((t) => titleService.setTitle(t)));

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

  onBlogLoadError(ignore: string) {
    this._paramIdSubscriptions.push(
      this._paramId$.subscribe(id => this.router.navigate(['blog/notfound', id]))
    );
  }
}
