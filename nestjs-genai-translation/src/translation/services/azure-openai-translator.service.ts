import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { v4 } from 'uuid';
import { env } from '~configs/env.config';
import { Translator } from '~translation/interfaces/translator.interface';

@Injectable()
export class AzureOpenAITranslatorService implements Translator {
  constructor(private httpService: HttpService) {}

  async translate(text: string, srcLanguageCode: string, targetLanguageCode: string): Promise<string> {
    // https://learn.microsoft.com/en-us/azure/ai-services/translator/language-support
    // const srcLanguage = ISO6391.getName(srcLanguageCode);
    // const targetLanguage = ISO6391.getName(targetLanguageCode);

    // if (!srcLanguage) {
    //   throw new BadRequestException(`${srcLanguageCode} is an invalid language code`);
    // }

    // if (!targetLanguage) {
    //   throw new BadRequestException(`${targetLanguage} is an invalid language code`);
    // }

    const data = [{ text }];
    const result$ = this.httpService
      .post(env.AZURE_OPENAI_TRANSLATOR.URL, data, {
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
      .pipe(map(({ data }) => data));
    const translations = firstValueFrom(result$);

    return translations;
  }
}
