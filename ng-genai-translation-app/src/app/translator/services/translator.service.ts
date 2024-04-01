import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { catchError, filter, map, of, retry, switchMap } from 'rxjs';
import config from '~assets/config.json';
import { Translate } from '../interfaces/translate.interface';
import { TranslationResult } from '../interfaces/translation-result.interface';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  private readonly httpService = inject(HttpClient);

  private translate = signal<Translate>({
    text: '',
    from: '',
    to: '',
    isValid: false,
  });

  translation$  = toObservable(this.translate)
    .pipe(
      filter(({ isValid }) => isValid),
      map(({ text, from, to }) => ({ text, srcLanguageCode: from, targetLanguageCode: to })),
      switchMap((data) => 
        this.httpService.post<{ text: string }>(`${config.url}/translator`, data)
          .pipe(
            retry(3),
            map(({ text: result }) => ({ 
              source: data.text,
              result
            })),
            catchError((err) => {
              console.error(err);
              return of({
                source: data.text,
                result: 'No translation due to error',
              });
            })
          )
      ),
      map((result) => result as TranslationResult),
    );

  getSupportedLanguages() {
    return config.languages;
  }

  translateText(data: Translate) {
    this.translate.set(data);
  }
}
