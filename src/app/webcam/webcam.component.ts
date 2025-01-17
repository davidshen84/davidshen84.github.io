import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { TitleService } from '../title.service';
import { GaService } from '../ga.service';
import { BaseComponent } from '../base-component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss'],
  providers: [GaService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [WebcamModule, NgIf],
})
export class WebcamComponent extends BaseComponent implements OnInit {
  private _snapshotTrigger = new Subject<void>();
  public snapshotTrigger$ = this._snapshotTrigger.asObservable();
  private _image?: WebcamImage;
  @ViewChild('canvas', { static: true })
  private _canvasRef!: ElementRef;
  private _canvas!: HTMLCanvasElement;

  constructor(titleService: TitleService, ga: GaService) {
    super(ga);
    titleService.setTitle('Webcam');
  }

  public get showSnapshot() {
    return this._image != null;
  }

  public get imageUrl() {
    return this._image?.imageAsDataUrl;
  }

  ngOnInit() {
    this._canvas = this._canvasRef.nativeElement;
  }

  public takeSnapshot() {
    this._snapshotTrigger.next();
  }

  public captureSnapshot(image: WebcamImage) {
    this._image = image;

    // Invert the color for fun!!!
    const context2d = this._canvas.getContext('2d')!;
    this._canvas.height = image.imageData.height;
    this._canvas.width = image.imageData.width;

    for (let i = 0, d = image.imageData.data; i < d.length; i += 4) {
      d[i] = 255 - d[i];
      d[i + 1] = 255 - d[i + 1];
      d[i + 2] = 255 - d[i + 2];
      d[i + 3] = 255;
    }
    context2d.putImageData(image.imageData, 0, 0);
  }
}
