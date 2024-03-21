import { Injectable } from '@nestjs/common';
import { Translator } from './interfaces/translator.interface';
import { TranslationResult } from './interfaces/translation-result.interface';
import { TranslateInput } from './interfaces/translator-input.interface';
import { LanguageCodeType, LanguageName } from './enums/languages.enum';

@Injectable()
export class LangchainTranslatorService implements Translator {
  readonly languageMapper = new Map<LanguageCodeType, LanguageName>();

  constructor() {
    this.languageMapper.set('en', 'English');
    this.languageMapper.set('es', 'Spanish');
    this.languageMapper.set('ja', 'Japanese');
    this.languageMapper.set('vi', 'Vietnamese');
    this.languageMapper.set('zh-Hans', 'Simplified Chinese');
    this.languageMapper.set('zh-Hant', 'Traditional Chinese');
  }
  translate({ text, srcLanguageCode, targetLanguageCode }: TranslateInput): Promise<TranslationResult> {
    const srcLanguageName = this.languageMapper.get(srcLanguageCode);
    const targetLanguageName = this.languageMapper.get(targetLanguageCode);
    console.log(text, srcLanguageName, targetLanguageName);
    throw new Error('Method not implemented.');
  }
}
