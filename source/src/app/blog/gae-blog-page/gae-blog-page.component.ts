import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {merge, Observable, of, Subscription} from 'rxjs';
import {catchError, filter, flatMap, map, share} from 'rxjs/operators';
import {Blog, GaeBlogService} from './gae-blog.service';
import {TitleService} from '../../title.service';
import {HttpErrorResponse} from '@angular/common/http';
import {fromPromise} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-gae-blog-page',
  templateUrl: './gae-blog-page.component.html',
  styleUrls: ['./gae-blog-page.component.scss']
})
export class GaeBlogPageComponent implements OnInit, OnDestroy {

  public blog$: Observable<Blog>;
  public blogContent$: Observable<string>;
  private setTitleSubscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private gaeBlogService: GaeBlogService, private titleService: TitleService) {
  }

  ngOnInit() {
    this.blog$ = this.activatedRoute.params.pipe(
      map(p => p['id']),
      flatMap(urlsafe => {
        const result = this.gaeBlogService.getBlog(urlsafe).pipe(
          catchError((e: HttpErrorResponse) => of(e)),
          share()
        );

        return merge(
          result.pipe(
            filter(r => r instanceof HttpErrorResponse),
            map(r => r as HttpErrorResponse),
            flatMap(e => fromPromise(this.router.navigate(['blog/notfound', e.url]))
              .pipe(map(() => (<Blog>null))))
          ),
          result.pipe(
            filter(r => !(r instanceof HttpErrorResponse)),
            map(b => b as Blog)
          )
        );
      }),
      share()
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
