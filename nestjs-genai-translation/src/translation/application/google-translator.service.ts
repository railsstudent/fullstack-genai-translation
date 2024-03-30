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

  async translate({ text, srcLanguageCode: from, targetLanguageCode }: TranslateInput): Promise<TranslationResult> {
    // supported languages: https://cloud.google.com/translate/docs/languages
    const to = this.convertLanguageCode(targetLanguageCode);
    const [translatedText] = await this.translateApi.translate(text, {
      from,
      to,
    });

    return {
      text: translatedText,
      aiService: 'google_translate',
    };
  }

  private convertLanguageCode(languageCode: LanguageCodesType) {
    let toLanguage = `${languageCode}`;
    if (languageCode === 'zh-Hans') {
      toLanguage = 'zh-CN';
    } else if (languageCode === 'zh-Hant') {
      toLanguage = 'zh-TW';
    }

    return toLanguage;
  }
}
