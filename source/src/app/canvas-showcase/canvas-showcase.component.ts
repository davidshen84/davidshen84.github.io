import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { map, switchMap, takeUntil, throttleTime } from 'rxjs/operators';
import { TitleService } from '../title.service';
import { CanvasDrawService } from './canvas-draw.service';
import { BaseComponent } from '../base-component';
import { GaService } from '../ga.service';

@Component({
  selector: 'app-canvas-showcase',
  templateUrl: './canvas-showcase.component.html',
  styleUrls: ['./canvas-showcase.component.scss'],
  providers: [GaService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasShowcaseComponent extends BaseComponent
  implements OnInit, OnDestroy {
  public _points: Array<{ x; y }> = [];
  @ViewChild('canvas', { static: true })
  private _canvasRef: ElementRef;
  private _canvas: HTMLCanvasElement;
  private _dragDropSubscription: Subscription;

  constructor(
    private canvasDraw: CanvasDrawService,
    private _titleService: TitleService,
    ga: GaService
  ) {
    super(ga);
  }

  ngOnInit() {
    this._titleService.setTitle('Canvas Showcase');

    this._canvas = this._canvasRef.nativeElement;
    this.canvasDraw.setCanvas(this._canvas);

    // Set a point at the center of the canvas.
    this.canvasDraw.setPointOnCanvas(
      this._canvas.clientWidth / 2,
      this._canvas.clientHeight / 2,
      255,
      0,
      0,
      255
    );

    // Define the drag & drop observable.
    const target = new Hammer(this._canvas, {
      recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_ALL }]],
    });

    const _dragDrop$ = fromEvent(target, 'panstart').pipe(
      switchMap(() =>
        fromEvent(target, 'panmove').pipe(
          throttleTime(500),
          takeUntil(fromEvent(target, 'panend'))
        )
      ),
      map((e: HammerInput) => e.changedPointers[0] as PointerEvent)
    );

    this._dragDropSubscription = _dragDrop$.subscribe(
      ({ offsetX: x, offsetY: y }: PointerEvent) => {
        if (this._points.length > 10) {
          this._points = this._points.slice(1, this._points.length);
        }
        this._points.push({ x: Math.floor(x), y: Math.floor(y) });
        this.canvasDraw.setPointOnCanvas(x, y, 255, 0, 0, 255);
      }
    );
  }

  ngOnDestroy(): void {
    this._dragDropSubscription?.unsubscribe();
  }
}
