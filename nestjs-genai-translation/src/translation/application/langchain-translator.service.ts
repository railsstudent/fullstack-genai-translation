import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Inject, Injectable } from '@nestjs/common';
import { GEMINI_CHAT_MODEL } from './constants/translator.constant';
import { LanguageCodeType, LanguageName } from './enums/languages.enum';
import { TranslationResult } from './interfaces/translation-result.interface';
import { TranslateInput } from './interfaces/translator-input.interface';
import { Translator } from './interfaces/translator.interface';

@Injectable()
export class LangchainTranslatorService implements Translator {
  readonly languageMapper = new Map<LanguageCodeType, LanguageName>();
  readonly outputParser = new StringOutputParser();

  constructor(@Inject(GEMINI_CHAT_MODEL) private readonly chatModel: ChatGoogleGenerativeAI) {
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

    const systemMessageTemplate = SystemMessagePromptTemplate.fromTemplate(
      'You are a helpful language translator that translates {srcLanguageName} to {targetLanguageName}',
    );
    const humanMessageTemplate = HumanMessagePromptTemplate.fromTemplate('{text}');
    const chatPrompt = ChatPromptTemplate.fromMessages([systemMessageTemplate, humanMessageTemplate]);

    const llmChain = chatPrompt.pipe(this.chatModel).pipe(this.outputParser);
    const translatedText = await llmChain.invoke({
      srcLanguageName,
      targetLanguageName,
      text,
    });

    console.log('In langchain', translatedText);
    return {
      text: translatedText,
    };
  }
}
