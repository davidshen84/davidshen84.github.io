import { Injectable } from '@angular/core';
import { empty, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RandomCharacterGeneratorService {
  private static prime: number = 21001;
  // private static cjkutf8base: number = 0x4e00;
  // private static cjkutf8range: number =  0x51ff;
  private static LowerCases: string = 'abcdefghijklmnopqrstuvwxyz';
  private static UpperCases: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private static Digits: string = '0123456789';
  private static Specials: string = '`~!@#$%^&*()_+-={}|[]\\:";\'<>?,./';

  public CharCount: number = 16;
  public HasLowerCases: boolean = false;
  public HasUpperCases: boolean = false;
  public HasDigits: boolean = false;
  public HasSpecials: boolean = false;

  constructor() { }

  public generate(): string {
    let generatedChars: string = '';
    let charArr: string = '';

    if(this.HasLowerCases)
      charArr += RandomCharacterGeneratorService.LowerCases;

    if(this.HasUpperCases)
      charArr += RandomCharacterGeneratorService.UpperCases;

    if(this.HasDigits)
      charArr += RandomCharacterGeneratorService.Digits;

    if(this.HasSpecials)
      charArr += RandomCharacterGeneratorService.Specials;

    let charArrLen: number = charArr.length;
    if (charArrLen > 0) {
      generatedChars = '';
      let maxLen: number = this.CharCount;
      for (let i = 0; i < maxLen; i++) {
        let rnd: number = Math.ceil(RandomCharacterGeneratorService.prime * Math.random());
        generatedChars += charArr[rnd % charArrLen];
      }
    }

    return generatedChars;
  }

  public get$(){
    return of('x');
  }
}
