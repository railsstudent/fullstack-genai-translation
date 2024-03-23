import { Runnable } from '@langchain/core/runnables';
import { Inject, Injectable } from '@nestjs/common';
import { GEMINI_CHAT_MODEL_LLM_CHAIN } from './constants/translator.constant';
import { LanguageCodeType, LanguageName } from './enums/languages.enum';
import { TranslationResult } from './interfaces/translation-result.interface';
import { TranslateInput } from './interfaces/translator-input.interface';
import { Translator } from './interfaces/translator.interface';

@Injectable()
export class LangchainTranslatorService implements Translator {
  readonly languageMapper = new Map<LanguageCodeType, LanguageName>();

  constructor(@Inject(GEMINI_CHAT_MODEL_LLM_CHAIN) private readonly llmChain: Runnable<any, string>) {
    this.languageMapper.set('en', 'English');
    this.languageMapper.set('es', 'Spanish');
    this.languageMapper.set('ja', 'Japanese');
    this.languageMapper.set('vi', 'Vietnamese');
    this.languageMapper.set('zh-Hans', 'Simplified Chinese');
    this.languageMapper.set('zh-Hant', 'Traditional Chinese');
  }

  async translate({ text, srcLanguageCode, targetLanguageCode }: TranslateInput): Promise<TranslationResult> {
    const srcLanguageName = this.languageMapper.get(srcLanguageCode);
    const targetLanguageName = this.languageMapper.get(targetLanguageCode);

    const translatedText = await this.llmChain.invoke({
      srcLanguageName,
      targetLanguageName,
      text,
    });

    return {
      text: translatedText,
      aiService: 'langchain_googleChatModel',
    };
  }
}
