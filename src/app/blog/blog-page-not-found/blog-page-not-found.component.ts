import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TitleService } from '../../title.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-blog-page-not-found',
  templateUrl: './blog-page-not-found.component.html',
  styleUrls: ['./blog-page-not-found.component.scss'],
  imports: [AsyncPipe],
})
export class BlogPageNotFoundComponent implements OnInit {
  private _route = inject(ActivatedRoute);
  private _titleService = inject(TitleService);

  public BlogId$!: Observable<string>;

  constructor() {
    this._titleService.setTitle('Blog Not Found!!! 😞');
  }

  ngOnInit(): void {
    this.BlogId$ = this._route.params.pipe(map((_) => _['id']));
  }
}
