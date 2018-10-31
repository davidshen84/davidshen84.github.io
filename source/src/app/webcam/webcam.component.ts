import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
  }

  public takeSnapshot() {
    this.snapshotTrigger.next();
  }

  public captureSnapshot(image: WebcamImage) {
    this.image = image;
  }

  public get showSnapshot() {
    return this.image != null;
  }

  public get imageUrl() {
    return this.image.imageAsDataUrl;
  }
}
