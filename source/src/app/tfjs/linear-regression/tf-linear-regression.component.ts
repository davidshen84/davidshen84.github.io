import * as tf from '@tensorflow/tfjs';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CanvasDrawService} from '../../canvas-showcase/canvas-draw.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {auditTime, distinctUntilChanged, map} from 'rxjs/operators';
import {TitleService} from '../../title.service';

/**
 * Maps @param {n} within range @param {in_min} to @param {in_max} to another number in the range @param {out_min} to @param {out_max}.
 * @param n input number
 * @param in_min The lower bound of the input number.
 * @param in_max The upper bound of the input number.
 * @param out_min The lower bound of the output number.
 * @param out_max The upper bound of the output number.
 */
const normalize = (n: number, in_min: number, in_max: number, out_min: number, out_max: number): number =>
  (n - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;

@Component({
  selector: 'app-tfjs-linear-regression',
  templateUrl: './tf-linear-regression.component.html',
  styleUrls: ['./tf-linear-regression.component.scss']
})
export class TfLinearRegressionComponent implements OnInit {

  private _modelSubject = new BehaviorSubject<{ a: number, b: number }>({a: NaN, b: NaN});
  public readonly model$ = this._modelSubject.pipe(
    auditTime(1000),
    map(({a, b}) => ({a: a.toFixed(3), b: b.toFixed(3)})),
    map(({a, b}) => `Y = ${a}X + ${b}`),
    distinctUntilChanged());

  private _lossSubject: Subject<number> = new BehaviorSubject<number>(NaN);
  public readonly loss$ = this._lossSubject.pipe(
    auditTime(1000),
    map(v => v.toFixed(3)),
    distinctUntilChanged());

  // Input data normalized between 0 and 1.
  private _xs: number[] = [];
  // Label data normalized between 0 and 1.
  private _ys: number[] = [];

  @ViewChild('canvas')
  private _canvasRef: ElementRef;
  private _canvas: HTMLCanvasElement;

  constructor(private _canvasDraw: CanvasDrawService, private _titleService: TitleService) {
    _titleService.setTitle('Linear Regression with Tensorflow');
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

    await this.train(75);
    await this._updateCanvas();
  }

  public predict(x: number[]): tf.Tensor {
    return tf.tidy(() =>
      this._a.mul(tf.tensor1d(x)) // a * x
        .add(this._b) // + b
    );
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

    // Initialize variable
    this._a.assign(tf.scalar(Math.random()));
    this._b.assign(tf.scalar(Math.random()));

    // The training loop
    for (let i = 0; i < numIter; i++) {
      optimizer.minimize(() => {
        const ys = tf.tensor1d(this._ys);
        const predicts = this.predict(this._xs);
        const loss = tf.losses.meanSquaredError(ys, predicts) as tf.Scalar;

        this._lossSubject.next(loss.dataSync()[0]);
        this._modelSubject.next({a: this._a.dataSync()[0], b: this._b.dataSync()[0]});

        return loss;
      });

      await tf.nextFrame();
    }
  }

}
