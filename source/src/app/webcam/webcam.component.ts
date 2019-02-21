import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WebcamImage} from '@davidshen84/ngx-webcam';
import {Subject} from 'rxjs';
import {TitleService} from '../title.service';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnInit {
  private snapshotTrigger = new Subject();
  public snapshotTrigger$ = this.snapshotTrigger.asObservable();
  private image: WebcamImage;
  @ViewChild('canvas')
  private canvasRef: ElementRef;
  private canvas: HTMLCanvasElement;

  constructor(title: TitleService) {
    title.setTitle('Webcam');
  }

  public get showSnapshot() {
    return this.image != null;
  }

  public get imageUrl() {
    return this.image.imageAsDataUrl;
  }

  ngOnInit() {
    this.canvas = this.canvasRef.nativeElement;
  }

  public takeSnapshot() {
    this.snapshotTrigger.next();
  }

  public captureSnapshot(image: WebcamImage) {
    this.image = image;

    // Invert the color for fun!!!
    const context2d = this.canvas.getContext('2d');
    this.canvas.height = image.imageData.height;
    this.canvas.width = image.imageData.width;

    for (let i = 0, d = image.imageData.data; i < d.length; i += 4) {
      d[i] = 255 - d[i];
      d[i + 1] = 255 - d[i + 1];
      d[i + 2] = 255 - d[i + 2];
      d[i + 3] = 255;
    }
    context2d.putImageData(image.imageData, 0, 0);
  }
}
