import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnInit {
  private snapshotTrigger = new Subject();
  private image: WebcamImage;

  public snapshotTrigger$ = this.snapshotTrigger.asObservable();

  @ViewChild('canvas')
  private canvasRef: ElementRef;
  private canvas: HTMLCanvasElement;

  constructor() { }

  ngOnInit() {
    this.canvas = this.canvasRef.nativeElement;
  }

  public takeSnapshot() {
    this.snapshotTrigger.next();
  }

  public captureSnapshot(image: WebcamImage) {
    this.image = image;

    // Invert the color for fun!!!
    let context2d = this.canvas.getContext('2d');
    this.canvas.height = image.imageData.height;
    this.canvas.width = image.imageData.width;

    for(let i = 0, d = image.imageData.data; i< d.length; i += 4) {
      d[i + 0] = 255 - d[i + 0];
      d[i + 1] = 255 - d[i + 1];
      d[i + 2] = 255 - d[i + 2];
      d[i + 3] = 255;
    }
    context2d.putImageData(image.imageData, 0, 0);
  }

  public get showSnapshot() {
    return this.image != null;
  }

  public get imageUrl() {
    return this.image.imageAsDataUrl;
  }
}
