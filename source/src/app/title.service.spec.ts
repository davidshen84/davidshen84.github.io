import { inject, TestBed } from '@angular/core/testing';
import { TitleService } from './title.service';

describe('TitleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TitleService],
    });
  });

  it('should be created', inject([TitleService], (service: TitleService) => {
    expect(service).toBeTruthy();
  }));

  it('should return empty title', inject(
    [TitleService],
    (service: TitleService) => {
      service.getTitle().subscribe({
        next: (v) => expect(v).toBe(''),
      });
    }
  ));

  it('should update title', inject([TitleService], (service: TitleService) => {
    service.setTitle('new title');
    service.getTitle().subscribe((v) => expect(v).toBe('new title'));
  }));
});
