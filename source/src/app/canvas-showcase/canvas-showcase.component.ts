import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-canvas-showcase',
  templateUrl: './canvas-showcase.component.html',
  styleUrls: ['./canvas-showcase.component.scss']
})
export class CanvasShowcaseComponent implements OnInit {

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  private canvas: HTMLCanvasElement;

  /**
   * Set the color of a pixel on the provided ImageData instance.
   * @param imageData
   * @param x the X coordinate
   * @param y the Y coordinate
   * @param r the R value of the color
   * @param g the G value of the color
   * @param b the B value of the color
   * @param a the Alpha value of the color
   * @returns the updated ImageData instance
   */
  private static setPointOnImageData(imageData: ImageData, x: number, y: number, r: number, g: number, b: number, a: number): ImageData {

    const position: number = (x + y * imageData.width) * 4;
    imageData.data[position] = r;
    imageData.data[position + 1] = g;
    imageData.data[position + 2] = b;
    imageData.data[position + 3] = a;

    return imageData;
  }

  constructor() {
  }

  ngOnInit() {
    this.canvas = this.canvasRef.nativeElement;

    this.setPointOnCanvas(this.canvas.width / 2, this.canvas.height / 2, 255, 0, 0);
  }

  public onMouseDown() {
    fromEvent<MouseEvent>(this.canvas, 'mousemove').pipe(
      takeUntil(fromEvent(this.canvas, 'mouseup'))
    ).subscribe(e => {
      const x = Math.floor(e.offsetX / this.canvas.clientWidth * this.canvas.width);
      const y = Math.floor(e.offsetY / this.canvas.clientHeight * this.canvas.height);
      this.setPointOnCanvas(x, y, 255, 0, 0);
    });
  }

  private setPointOnCanvas(x: number, y: number, r: number, g: number, b: number, a: number = 255): void {
    const context2d = this.canvas.getContext('2d');

    let imageData = context2d.getImageData(0, 0, this.canvas.width, this.canvas.height);
    imageData = CanvasShowcaseComponent.setPointOnImageData(imageData, x, y, r, g, b, a);
    context2d.putImageData(imageData, 0, 0);
  }


  public onClick(e: MouseEvent) {
    const x = Math.floor(e.offsetX / this.canvas.clientWidth * this.canvas.width);
    const y = Math.floor(e.offsetY / this.canvas.clientHeight * this.canvas.height);
    // console.log(x, y);

    this.setPointOnCanvas(x, y, 255, 0, 0);
  }


}
