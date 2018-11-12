import {Component, OnInit} from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-tfjs',
  templateUrl: './tfjs.component.html',
  styleUrls: ['./tfjs.component.scss']
})
export class TfjsComponent implements OnInit {

  private x: any;

  constructor() {
  }

  ngOnInit() {
    const a = tf.scalar(1.0);
    const b = tf.scalar(1.0);

    this.x = tf.tidy(() => tf.add(a, b));


  }

  public get X() {
    return this.x;
  }

}
