import {Injectable} from '@angular/core';

/**
 * Structure to store the X and Y coordinates of the mouse.
 */
export interface MouseXY {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root'
})
export class CanvasDrawService {

  constructor() {
  }
  private _canvas: HTMLCanvasElement;
  private _context2d: CanvasRenderingContext2D;

  private static map(n: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    return (n - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  /**
   * Associate the service with a _canvas instance. Other operations depends on this _canvas instance.
   * @param canvas the instance.
   */
  public setCanvas(canvas: HTMLCanvasElement): void {
    this._canvas = canvas;
    this._context2d = this._canvas.getContext('2d');
  }

  /**
   * Set the RGBA value of a point in the canvas' ImageData object.
   * @param mouseX usually the {MouseEvent.x} value.
   * @param mouseY usually the {MouseEvent.y} value.
   * @param r the R value of the color.
   * @param g the G value of the color.
   * @param b the B value of the color.
   * @param a the Alpha value of the color.
   */
  public setPointOnCanvas(mouseX: number, mouseY: number, r: number, g: number, b: number, a: number): void {
    const imageData = this._context2d.getImageData(0, 0, this._canvas.width, this._canvas.height);
    const {x, y} = this.getCanvasCoordinates({x: mouseX, y: mouseY});
    const position: number = (x + y * imageData.width) * 4;

    imageData.data[position] = r;
    imageData.data[position + 1] = g;
    imageData.data[position + 2] = b;
    imageData.data[position + 3] = a;

    this._context2d.putImageData(imageData, 0, 0);
  }

  /**
   * Clean the associated canvas.
   */
  public cleanCanvas(): void {
    const imageData = new ImageData(this._canvas.clientWidth, this._canvas.clientHeight);
    this._context2d.putImageData(imageData, 0, 0);
  }

  private mapX = (offsetX: number) => CanvasDrawService.map(offsetX, 0, this._canvas.clientWidth, 0, this._canvas.width);

  private mapY = (offsetY: number) => CanvasDrawService.map(offsetY, 0, this._canvas.clientHeight, 0, this._canvas.height);

  /**
   * Compute the canvas coordinates from offset coordinates which is relative to the element.
   * @param xy MouseXY instance
   */
  private getCanvasCoordinates(xy: MouseXY): { x, y } {
    return {
      /*      x: Math.floor(e.x / this._canvas.clientWidth * this._canvas.width),
            y: Math.floor(e.y / this._canvas.clientHeight * this._canvas.height)*/
      x: Math.floor(this.mapX(xy.x)),
      y: Math.floor(this.mapY(xy.y))
    };
  }
}
