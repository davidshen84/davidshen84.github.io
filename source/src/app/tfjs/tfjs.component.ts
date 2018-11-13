import * as tf from '@tensorflow/tfjs';
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CanvasDrawService} from '../canvas-showcase/canvas-draw.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {distinctUntilChanged, throttleTime} from 'rxjs/operators';

const normalize = (n: number, in_min: number, in_max: number, out_min: number, out_max: number): number =>
  (n - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;

@Component({
  selector: 'app-tfjs',
  templateUrl: './tfjs.component.html',
  styleUrls: ['./tfjs.component.scss']
})
export class TfjsComponent implements OnInit, OnDestroy {

  // Input data normalized between 0 and 1.
  private _xs: number[] = [];
  // Label data normalized between 0 and 1.
  private _ys: number[] = [];
  @ViewChild('canvas')
  private _canvasRef: ElementRef;
  private _canvas: HTMLCanvasElement;

  private _lossSubject: BehaviorSubject<number> = new BehaviorSubject<number>(NaN);

  private _trainingSubscription: Subscription;

  constructor(private _canvasDraw: CanvasDrawService) {
  }

  public get loss$() {
    return this._lossSubject.pipe(throttleTime(500), distinctUntilChanged());
  }

  private _a = tf.variable(tf.scalar(Math.random()));

  public get a() {
    return this._a.dataSync()[0];
  }

  private _b = tf.variable(tf.scalar(Math.random()));

  public get b() {
    return this._b.dataSync()[0];
  }

  public get Ys() {
    return this._ys;
  }

  ngOnInit() {
    this._canvas = this._canvasRef.nativeElement;
    this._canvasDraw.setCanvas(this._canvas);
  }

  public async onMouseClick(e: MouseEvent) {
    const x = this._normalizeX(e.offsetX);
    const y = this._normalizeY(e.offsetY);
    this._canvasDraw.setPointOnCanvas(this._denormalizeX(x), this._denormalizeY(y), 255, 0, 0, 255);
    this._xs.push(x);
    this._ys.push(y);

    await this.train(200);
    await this._updateCanvas();
  }

  public predict(x: number[]): tf.Tensor {
    return tf.tidy(() =>
      this._a.mul(tf.tensor1d(x)) // a * x
        .add(this._b) // + b
    );
  }

  ngOnDestroy(): void {
    this._trainingSubscription.unsubscribe();
  }

  private _normalizeX(offsetX: number): number {
    return normalize(offsetX, 0, this._canvas.clientWidth, 0, 1);
  }

  private _denormalizeX(x: number): number {
    return normalize(x, 0, 1, 0, this._canvas.clientWidth);
  }

  private _normalizeY(offsetY: number): number {
    return normalize(offsetY, 0, this._canvas.clientHeight, 1, 0);
  }

  private _denormalizeY(y: number): number {
    return normalize(y, 0, 1, this._canvas.clientHeight, 0);
  }

  private _drawPredictions(xs: ArrayLike<number>, ys: ArrayLike<number>): Promise<void> {
    return new Promise<void>(resolve => {
      for (let i = 0; i < xs.length; i++) {
        this._canvasDraw.setPointOnCanvas(xs[i], ys[i], 255, 0, 0, 255);
      }
      resolve();
    });
  }

  private _drawPoint(): void {
    for (let i = 0; i < this._xs.length; i++) {
      const x = this._denormalizeX(this._xs[i]);
      const y = this._denormalizeY(this._ys[i]);

      this._canvasDraw.setPointOnCanvas(x, y, 255, 0, 0, 255);
    }
  }

  private async _updateCanvas(): Promise<void> {
    this._canvasDraw.cleanCanvas();
    this._drawPoint();
    const xs = Array.from(Array(this._canvas.clientWidth).keys()).filter(x => x % 2 === 0);
    const ys = (this.predict(xs.map(this._normalizeX, this)).dataSync() as Float32Array).map(this._denormalizeY, this);
    await this._drawPredictions(xs, ys);
  }

  private async train(numIter = 50) {
    const learningRate = 0.5;
    const optimizer = tf.train.sgd(learningRate);

    for (let i = 0; i < numIter; i++) {
      optimizer.minimize(() => {
        const ys = tf.tensor1d(this._ys);
        const predicts = this.predict(this._xs);
        const loss = tf.losses.meanSquaredError(ys, predicts) as tf.Scalar;
        this._lossSubject.next(loss.dataSync()[0]);

        return loss;
      });

      await tf.nextFrame();
    }
  }

}
