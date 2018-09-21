import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';

import { RandomCharacterGeneratorService } from './random-character-generator.service';
import { tap } from 'rxjs/operators';

describe('RandomCharacterGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RandomCharacterGeneratorService]
    });
  });

  it('should be created', inject([RandomCharacterGeneratorService], (service: RandomCharacterGeneratorService) => {
    expect(service).toBeTruthy();
  }));

  it('should not allow any types of characters by default', inject([RandomCharacterGeneratorService], (service: RandomCharacterGeneratorService) => {
    expect(service.HasDigits).toBe(false);
    expect(service.HasLowerCases).toBe(false);
    expect(service.HasSpecials).toBe(false);
    expect(service.HasUpperCases).toBe(false);
  }));

  it('should generate random characters, char count = 8, 16', inject([RandomCharacterGeneratorService], (service: RandomCharacterGeneratorService) => {
    service.HasDigits = true;
    expect(service.generate().length).toBe(16);

    service.CharCount = 8;
    expect(service.generate().length).toBe(8);
  }));

  it('should generate random characters containing upper and lower case letters', inject([RandomCharacterGeneratorService], (service: RandomCharacterGeneratorService) => {
    service.HasUpperCases = true;
    service.HasLowerCases = true;
    expect(service.generate()).toMatch(/[a-zA-Z]{16}/);
  }));

  it('should generate random characters containing all types of characters', inject([RandomCharacterGeneratorService], (service: RandomCharacterGeneratorService) => {
    service.HasUpperCases = true;
    service.HasLowerCases = true;
    service.HasDigits = true;
    service.HasSpecials = true;

    expect(service.generate()).toMatch(/[a-zA-Z0-9`~!@#$%^&*()_+\-={}|\[\]\\:";'<>?,.\/]{16}/);
  }));

  it('should get$', inject([RandomCharacterGeneratorService], (service: RandomCharacterGeneratorService) => {
    let r = null;
    service.get$().pipe(tap(console.log)).subscribe(v => r = v);
    expect(r).toBe('x');
  }));
});
