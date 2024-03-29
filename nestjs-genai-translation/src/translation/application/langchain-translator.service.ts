import { Runnable } from '@langchain/core/runnables';
import { Inject, Injectable } from '@nestjs/common';
import { GEMINI_CHAT_MODEL_LLM_CHAIN } from './constants/translator.constant';
import { LANGUAGE_NAMES } from './enums/language_names.enum';
import { TranslationResult } from './interfaces/translation-result.interface';
import { TranslateInput } from './interfaces/translator-input.interface';
import { Translator } from './interfaces/translator.interface';
import { LanguageCodesType } from './validations/language_codes.validation';

@Injectable()
export class LangchainTranslatorService implements Translator {
  readonly languageMapper = new Map<LanguageCodesType, LANGUAGE_NAMES>();

  constructor(@Inject(GEMINI_CHAT_MODEL_LLM_CHAIN) private readonly llmChain: Runnable<any, string>) {
    this.languageMapper.set('en', LANGUAGE_NAMES.ENGLISH);
    this.languageMapper.set('es', LANGUAGE_NAMES.SPANISH);
    this.languageMapper.set('ja', LANGUAGE_NAMES.JAPANESE);
    this.languageMapper.set('vi', LANGUAGE_NAMES.VIETNAMESE);
    this.languageMapper.set('zh-Hans', LANGUAGE_NAMES.SIMPLIFIED_CHINESE);
    this.languageMapper.set('zh-Hant', LANGUAGE_NAMES.TRADITIONAL_CHINESE);
  }

  async translate({ text, srcLanguageCode, targetLanguageCode }: TranslateInput): Promise<TranslationResult> {
    const srcLanguageName = this.languageMapper.get(srcLanguageCode);
    const targetLanguageName = this.languageMapper.get(targetLanguageCode);

    const translatedText = await this.llmChain.invoke({
      srcLanguageName,
      targetLanguageName,
      text: text,
    });

    return {
      text: translatedText,
      aiService: 'langchain_googleChatModel',
    };
  }
}
