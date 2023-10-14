import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Remarkable } from 'remarkable';
// @ts-ignore
import rkatex from 'remarkable-katex';
import { of, race, Subject } from 'rxjs';
import { catchError, filter, map, share, switchMap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import hljs from 'highlight.js';
import { AsyncPipe } from '@angular/common';

/** An Angular component for the reMarkable library
 *
 * # Usage:
 *
 * You can use the `src` attribute to download the markdown content*
 *
 * ```html
 * <app-remarkable src='../readme.md'></app-remarkable>
 * ```
 *
 * If you want to use inline markdown content, you need to:
 * - wrap the content in a `pre` element with the `#content` id
 * - modify the indentation of the content
 *
 * ```html
 * <app-remarkable>
 *   <pre #content>
 * |<- markdown indentation starts here
 *   </pre
 * </app-remarkable
 * ```
 */
@Component({
  selector: 'app-remarkable',
  templateUrl: './remarkable.component.html',
  styleUrls: ['./remarkable.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export class RemarkableComponent
  implements OnChanges, AfterContentChecked, AfterViewInit
{
  @Input()
  public src: string | null = null;
  private readonly md: Remarkable;
  @ContentChild('content', { static: true })
  private content!: ElementRef;

  private srcSubject = new Subject<string>();
  private srcHttpResponse$ = this.srcSubject.pipe(
    switchMap((x) =>
      this.http
        .get(x, { observe: 'response', responseType: 'text' })
        .pipe(catchError((x) => of(x as HttpResponse<string>))),
    ),
    share(),
  );
  @Output()
  public errorEvent = this.srcHttpResponse$.pipe(
    filter((x) => x.status !== 200),
  );
  private contentSubject = new Subject<string>();
  public markdown$ = race(
    this.srcHttpResponse$.pipe(
      filter((x) => x.status === 200),
      map((x) => x.body),
    ),
    this.contentSubject.asObservable(),
  ).pipe(
    map((x) => this.md.render(x!)),
    map(this.sanitizer.bypassSecurityTrustHtml),
  );

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
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
  }

  ngAfterViewInit(): void {
    if (this.src) {
      this.srcSubject.next(this.src);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src && !changes.src.isFirstChange()) {
      this.srcSubject.next(changes.src.currentValue);
    }
  }

  ngAfterContentChecked(): void {
    if (this.content) {
      this.contentSubject.next(this.content.nativeElement.textContent);
    }
  }
}
