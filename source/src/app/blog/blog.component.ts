
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public blogPath$: Observable<string>;
  public showDefault$: Observable<boolean>;

  constructor(private _route: ActivatedRoute) {
  }

  ngOnInit() {
    let paramId$ = this._route.params.pipe(
      map(p => p['id'])
    );

    this.showDefault$ = paramId$.pipe(
      map(p => p === undefined)
    );

    this.blogPath$ = paramId$.pipe(
      map(p => `assets/${p}.md`),
    );
  }

}
