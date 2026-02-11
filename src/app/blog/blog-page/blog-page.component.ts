import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from '../../title.service';
import { GaService } from '../../ga.service';
import { BaseComponent } from '../../base-component';
import { RemarkableComponent } from '../../remarkable/remarkable.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
  imports: [RemarkableComponent],
})
export class BlogPageComponent extends BaseComponent {
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _titleService = inject(TitleService);

  private readonly _paramsSig = toSignal(this._route.params, {
    initialValue: { id: '' },
  });
  private readonly _idSig = computed(() => this._paramsSig().id as string);
  public readonly blogPath = computed<string | null>(() => {
    const id = this._idSig();
    return id ? `assets/blogs/${id}.md` : null;
  });

  constructor() {
    const ga = inject(GaService);

    super(ga);

    effect(() => {
      const id = this._idSig();
      if (id) {
        this._titleService.setTitle(id.replace(/-/g, ' '));
      }
    });
  }

  onBlogLoadError(_: any) {
    const id = this._idSig();
    this._router.navigate(['blog/notfound', id]);
  }
}
