import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { TitleService } from '../../title.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blog-page-not-found',
  templateUrl: './blog-page-not-found.component.html',
  styleUrls: ['./blog-page-not-found.component.scss'],
})
export class BlogPageNotFoundComponent {
  private _route = inject(ActivatedRoute);
  private _titleService = inject(TitleService);

  public readonly blogId = toSignal(
    this._route.params.pipe(map((params) => params['id'] as string)),
    { initialValue: '' },
  );

  constructor() {
    this._titleService.setTitle('Blog Not Found!!! 😞');
  }
}
