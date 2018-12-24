import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {map, switchMap, takeUntil, throttleTime} from 'rxjs/operators';
import {CanvasDrawService} from './canvas-draw.service';


@Component({
  selector: 'app-canvas-showcase',
  templateUrl: './canvas-showcase.component.html',
  styleUrls: ['./canvas-showcase.component.scss']
})
export class CanvasShowcaseComponent implements OnInit, OnDestroy {

  public _points: Array<{}> = [];
  @ViewChild('canvas')
  private _canvasRef: ElementRef;
  private _canvas: HTMLCanvasElement;
  private _canvasDraw: CanvasDrawService;
  private _dragDropSubscription: Subscription;

  constructor(canvasDraw: CanvasDrawService) {
    this._canvasDraw = canvasDraw;
  }

  ngOnInit() {
    this._canvas = this._canvasRef.nativeElement;
    this._canvasDraw.setCanvas(this._canvas);

    // Set a point at the center of the canvas.
    this._canvasDraw.setPointOnCanvas(this._canvas.clientWidth / 2, this._canvas.clientHeight / 2, 255, 0, 0, 255);

    // Define the drag-drop observable.
    const target = new Hammer(this._canvas);
    target.get('pan').set({direction: Hammer.DIRECTION_ALL});

    const _dragDrop$ = fromEvent(target, 'panstart').pipe(
      switchMap(() => fromEvent(target, 'panmove').pipe(
        throttleTime(500),
        takeUntil(fromEvent(target, 'panend')))),
      map((e: HammerInput) => e.changedPointers[0] as PointerEvent)
    );

    this._dragDropSubscription = _dragDrop$.subscribe(({offsetX: x, offsetY: y}: PointerEvent) => {
      this._points.push({x: x, y: y});
      this._canvasDraw.setPointOnCanvas(x, y, 255, 0, 0, 255);
    });
  }

  ngOnDestroy(): void {
    this._dragDropSubscription.unsubscribe();
  }
}
