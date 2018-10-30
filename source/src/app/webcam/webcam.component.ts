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

  constructor() { }

  ngOnInit() {
  }

  private takeSnapshot(image: WebcamImage) {
    this.image = image;
  }
}
