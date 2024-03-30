import { v2 } from '@google-cloud/translate';
import { Inject, Injectable } from '@nestjs/common';
import { GOOGLE_TRANSLATE } from './constants/translator.constant';
import { TranslationResult } from './interfaces/translation-result.interface';
import { TranslateInput } from './interfaces/translator-input.interface';
import { Translator } from './interfaces/translator.interface';
import { LanguageCodesType } from './validations/language_codes.validation';

@Injectable()
export class GoogleTranslatorService implements Translator {
  constructor(@Inject(GOOGLE_TRANSLATE) private translateApi: v2.Translate) {}
  async translate({ text, srcLanguageCode, targetLanguageCode }: TranslateInput): Promise<TranslationResult> {
    // supported languages: https://cloud.google.com/translate/docs/languages
    const toLanguage = this.convertLanguageCode(targetLanguageCode);
    const [translatedText] = await this.translateApi.translate(text, {
      from: srcLanguageCode,
      to: toLanguage,
    });
    return {
      text: translatedText,
      aiService: 'google_translate',
    };
  }

  private convertLanguageCode(targetLanguageCode: LanguageCodesType) {
    let toLanguage = `${targetLanguageCode}`;
    if (targetLanguageCode === 'zh-Hans') {
      toLanguage = 'zh-CN';
    } else if (targetLanguageCode === 'zh-Hant') {
      toLanguage = 'zh-TW';
    }
    return toLanguage;
  }
}
