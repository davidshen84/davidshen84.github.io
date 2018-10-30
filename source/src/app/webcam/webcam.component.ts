import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnInit {
  public snapshotTrigger = new Subject();
  public image: WebcamImage;

  constructor() { }

  ngOnInit() {
  }

  public takeSnapshot(image: WebcamImage) {
    this.image = image;
  }
}
