import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { v4 } from 'uuid';
import { env } from '~configs/env.config';
import { TranslateTextDto } from '~translation/http/dtos/translate-text.dto';
import { Translator } from './interfaces/translator.interface';
import { AzureTranslateResponse } from './interfaces/azure-openai-response.interface';

@Injectable()
export class AzureTranslatorService implements Translator {
  constructor(private httpService: HttpService) {}

  async translate({ text, srcLanguageCode, targetLanguageCode }: TranslateTextDto): Promise<{ text: string }> {
    // https://learn.microsoft.com/en-us/azure/ai-services/translator/language-support
    const data = [{ text }];
    const result$ = this.httpService
      .post<AzureTranslateResponse[]>(env.AZURE_OPENAI_TRANSLATOR.URL, data, {
        headers: {
          'Ocp-Apim-Subscription-Key': env.AZURE_OPENAI_TRANSLATOR.KEY,
          'Ocp-Apim-Subscription-Region': env.AZURE_OPENAI_TRANSLATOR.LOCATION,
          'Content-type': 'application/json',
          'X-ClientTraceId': v4(),
        },
        params: {
          'api-version': env.AZURE_OPENAI_TRANSLATOR.VERSION,
          from: srcLanguageCode,
          to: targetLanguageCode,
        },
        responseType: 'json',
      })
      .pipe(
        map(({ data }) => data?.[0]?.translations?.[0].text || 'No result'),
        map((text) => ({ text })),
      );
    return firstValueFrom(result$);
  }
}
