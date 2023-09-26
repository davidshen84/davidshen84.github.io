import * as tf from '@tensorflow/tfjs';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CanvasDrawService } from '../../canvas-showcase/canvas-draw.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { auditTime, distinctUntilChanged, map } from 'rxjs/operators';
import { TitleService } from '../../title.service';
import { GaService } from '../../ga.service';
import { BaseComponent } from '../../base-component';

/**
 * Maps @param {n} within range @param {in_min} to @param {in_max} to another number in the range @param {out_min} to @param {out_max}.
 * @param {number} n input number
 * @param {number} in_min The lower bound of the input number.
 * @param {number} in_max The upper bound of the input number.
 * @param {number} out_min The lower bound of the output number.
 * @param {number} out_max The upper bound of the output number.
 *
 * @return {number}
 */
const normalize = (
  n: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number,
): number => ((n - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;

@Component({
  selector: 'app-tfjs-linear-regression',
  templateUrl: './tf-linear-regression.component.html',
  styleUrls: ['./tf-linear-regression.component.scss'],
  providers: [GaService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TfLinearRegressionComponent
  extends BaseComponent
  implements OnInit
{
  private modelSubject = new BehaviorSubject<{ a: number; b: number }>({
    a: NaN,
    b: NaN,
  });

  public readonly model$ = this.modelSubject.pipe(
    auditTime(1000),
    map(({ a, b }) => ({ a: a.toFixed(3), b: b.toFixed(3) })),
    map(({ a, b }) => `Y = ${a}X + ${b}`),
    distinctUntilChanged(),
  );

  private costSubject: Subject<number> = new BehaviorSubject<number>(NaN);
  public readonly cost$ = this.costSubject.pipe(
    auditTime(1000),
    map((v) => v.toFixed(3)),
    distinctUntilChanged(),
    // tap(console.log),
  );

  // Input data normalized between 0 and 1.
  private xs: number[] = [];
  // Label data normalized between 0 and 1.
  private ys: number[] = [];

  @ViewChild('canvas', { static: true })
  private canvasRef!: ElementRef;
  private canvas!: HTMLCanvasElement;

  constructor(
    titleService: TitleService,
    ga: GaService,
    private canvasDraw: CanvasDrawService,
  ) {
    super(ga);
    titleService.setTitle('Linear Regression with TensorFlow');
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
    return this.ys;
  }

  ngOnInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.canvasDraw.setCanvas(this.canvas);
  }

  public async onMouseClick(e: MouseEvent) {
    const x = this.normalizeX(e.offsetX);
    const y = this.normalizeY(e.offsetY);
    this.canvasDraw.setPointOnCanvas(
      this.denormalizeX(x),
      this.denormalizeY(y),
      255,
      0,
      0,
      255,
    );
    this.xs.push(x);
    this.ys.push(y);

    await this.train(75);
    await this.updateCanvas();
  }

  public predict(x: number[]): tf.Tensor {
    return tf.tidy(
      () =>
        this._a
          .mul(tf.tensor1d(x)) // a * x
          .add(this._b), // + b
    );
  }

  // public typeset() {
  //   this.mathJax.MathJaxTypeset();
  // }

  private normalizeX(offsetX: number): number {
    return normalize(offsetX, 0, this.canvas.clientWidth, 0, 1);
  }

  private denormalizeX(x: number): number {
    return normalize(x, 0, 1, 0, this.canvas.clientWidth);
  }

  private normalizeY(offsetY: number): number {
    return normalize(offsetY, 0, this.canvas.clientHeight, 1, 0);
  }

  private denormalizeY(y: number): number {
    return normalize(y, 0, 1, this.canvas.clientHeight, 0);
  }

  private drawPredictions(
    xs: ArrayLike<number>,
    ys: ArrayLike<number>,
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      for (let i = 0; i < xs.length; i++) {
        this.canvasDraw.setPointOnCanvas(xs[i], ys[i], 255, 0, 0, 255);
      }
      resolve();
    });
  }

  private drawPoint(): void {
    for (let i = 0; i < this.xs.length; i++) {
      const x = this.denormalizeX(this.xs[i]);
      const y = this.denormalizeY(this.ys[i]);

      this.canvasDraw.setPointOnCanvas(x, y, 255, 0, 0, 255);
    }
  }

  private async updateCanvas(): Promise<void> {
    this.canvasDraw.cleanCanvas();
    this.drawPoint();
    const xs = Array.from(Array(this.canvas.clientWidth).keys()).filter(
      (x) => x % 2 === 0,
    );
    const ys = (
      this.predict(xs.map(this.normalizeX, this)).dataSync() as Float32Array
    ).map(this.denormalizeY, this);
    await this.drawPredictions(xs, ys);
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
        const ys = tf.tensor1d(this.ys);
        const predicts = this.predict(this.xs);
        const cost = tf.losses.meanSquaredError(ys, predicts) as tf.Scalar;

        this.costSubject.next(cost.dataSync()[0]);
        this.modelSubject.next({
          a: this._a.dataSync()[0],
          b: this._b.dataSync()[0],
        });

        return cost;
      });

      await tf.nextFrame();
    }
  }
}
