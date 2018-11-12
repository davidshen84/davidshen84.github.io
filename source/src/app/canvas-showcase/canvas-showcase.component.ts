import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {takeUntil, throttleTime} from 'rxjs/operators';
import {CanvasDrawService} from './canvas-draw.service';


@Component({
  selector: 'app-canvas-showcase',
  templateUrl: './canvas-showcase.component.html',
  styleUrls: ['./canvas-showcase.component.scss']
})
export class CanvasShowcaseComponent implements OnInit {

  @ViewChild('canvas')
  private _canvasRef: ElementRef;

  private _canvas: HTMLCanvasElement;

  public _points: Array<{}> = [];
  private _canvasDraw: CanvasDrawService;

  constructor(canvasDraw: CanvasDrawService) {
    this._canvasDraw = canvasDraw;
  }

  ngOnInit() {
    this._canvas = this._canvasRef.nativeElement;
    this._canvasDraw.setCanvas(this._canvas);
    this._canvasDraw.setPointOnCanvas(this._canvas.clientWidth / 2, this._canvas.clientHeight / 2, 255, 0, 0, 255);
  }

  public onMouseDown() {
    fromEvent<MouseEvent>(this._canvas, 'mousemove').pipe(
      throttleTime(500),
      takeUntil(fromEvent(this._canvas, 'mouseup'))
    ).subscribe(e => {
      this._points.push({x: e.offsetX, y: e.offsetY});
      // const {x, y} = this._canvasDraw.getCanvasCoordinates(e);
      this._canvasDraw.setPointOnCanvas(e.offsetX, e.offsetY, 255, 0, 0, 255);
    });
  }

}
