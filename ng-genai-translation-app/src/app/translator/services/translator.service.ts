import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  httpService = inject(HttpClient);

  getSupportedLanguages() {
    return [
      {
        code: 'en',
        name: 'English'
      },
      {
        code: 'es',
        name: 'Spanish'
      },
      {
        code: 'ja',
        name: 'Japanese'
      },
      {
        code: 'vi',
        name: 'Vietnamese'
      },
      {
        code: 'zh-Hant',
        name: 'Tranditional Chinese'
      },
      {
        code: 'zh-Hans',
        name: 'Simplified Chinese'
      },
    ];
  }

  translate(text: string) {
    console.log(text)
  }

}
