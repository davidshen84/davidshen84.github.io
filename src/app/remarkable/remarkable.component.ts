import {
  AfterContentChecked,
  Component,
  computed,
  ContentChild,
  effect,
  ElementRef,
  inject,
  input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Remarkable } from 'remarkable';
// @ts-ignore
import rkatex from 'remarkable-katex';
import { of, Subject } from 'rxjs';
import { catchError, filter, map, share, switchMap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import hljs from 'highlight.js';
import { toSignal } from '@angular/core/rxjs-interop';

/** An Angular component for the reMarkable library
 *
 * # Usage:
 *
 * You can use the `src` attribute to download the markdown contentRef*
 *
 * ```html
 * <app-remarkable src='../readme.md'></app-remarkable>
 * ```
 *
 * If you want to use inline markdown contentRef, you need to:
 * - wrap the contentRef in a `pre` element with the `#contentRef` id
 * - modify the indentation of the contentRef
 *
 * ```html
 * <app-remarkable>
 * |<- markdown indentation starts here
 * </app-remarkable
 * ```
 */
@Component({
  selector: 'app-remarkable',
  templateUrl: './remarkable.component.html',
  styleUrls: ['./remarkable.component.scss'],
  imports: [],
})
export class RemarkableComponent implements OnChanges, AfterContentChecked {
  public src = input<string | null>(null);

  @ContentChild('content', { static: true })
  private contentRef!: ElementRef;

  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  private readonly md: Remarkable;

  private srcSubject = new Subject<string>();
  private srcHttpResponse$ = this.srcSubject.pipe(
    switchMap((x) =>
      this.http
        .get(x, { observe: 'response', responseType: 'text' })
        .pipe(catchError((x) => of(x as HttpResponse<string>))),
    ),
    share(),
  );

  private responseBody = toSignal(
    this.srcHttpResponse$.pipe(
      filter((x) => x.status === 200),
      map((x) => x.body),
    ),
    { initialValue: '' },
  );

  @Output()
  public errorEvent = this.srcHttpResponse$.pipe(
    filter((x) => x.status !== 200),
  );
  private content = signal<string>('');

  public markdown = computed(() => {
    return this.renderMarkdown(this.content() || this.responseBody() || '');
  });

  private renderMarkdown(markdown: string | null) {
    return this.sanitizer.bypassSecurityTrustHtml(
      this.md.render(markdown || ''),
    );
  }

  constructor() {
    this.md = new Remarkable('full', {
      breaks: true,
      // typographer: true,
      highlight: function (str: string, lang: string): string {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value;
          } catch (err) {}
        }

        try {
          return hljs.highlightAuto(str).value;
        } catch (err) {}

        return ''; // use external default escaping
      },
    }).use(rkatex);

    effect(() => {
      const src = this.src() || '';
      if (src) {
        this.srcSubject.next(src);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src && !changes.src.isFirstChange()) {
      this.srcSubject.next(changes.src.currentValue);
    }
  }

  ngAfterContentChecked(): void {
    if (this.contentRef) {
      this.content.set(this.contentRef.nativeElement.textContent);
    }
  }
}
