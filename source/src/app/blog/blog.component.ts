
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {map, tap, filter} from 'rxjs/operators';
import {TitleService} from '../title.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {
  public blogPath$: Observable<string>;
  private _paramIdSubscription: Subscription;

  constructor(private _route: ActivatedRoute, private _titleService: TitleService) {
  }

  ngOnInit() {
    let paramId$ = this._route.params.pipe(
      map(p => p['id'])
    );

    this._paramIdSubscription = paramId$.pipe(
      filter(p => p !== undefined),
    ).subscribe(this._titleService.setTitle);

    this.blogPath$ = paramId$.pipe(
      map(p => `assets/blogs/${p}.md`),
    );
  }

  ngOnDestroy() {
    if(this._paramIdSubscription != null)
      this._paramIdSubscription.unsubscribe();
  }
}
