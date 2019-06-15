import {TestBed} from '@angular/core/testing';

import {CanvasDrawService} from './canvas-draw.service';

describe('CanvasDrawService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanvasDrawService = TestBed.get(CanvasDrawService);
    expect(service).toBeTruthy();
  });
});
