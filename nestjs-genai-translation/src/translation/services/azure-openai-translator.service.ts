import { Injectable } from '@nestjs/common';
import { Translator } from '~translation/interfaces/translator.interface';

@Injectable()
export class AzureOpenAITranslatorService implements Translator {
  translate(text: string, srcLanguageCode: string, targetLanguageCode: string): string {
    console.log(text, srcLanguageCode, targetLanguageCode);
    return text;
  }
}
