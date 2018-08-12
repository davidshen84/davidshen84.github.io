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
  public id$: Observable<string>;

  constructor(private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id$ = this._route.params.pipe(
      map(p => p['id']),
      tap(console.log));
  }

}
