import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Integration } from '../core/types/integration.type';
import { AzureTranslatorService } from './application/azure-translator.service';
import { TRANSLATOR } from './application/constants/translator.constant';
import { GoogleTranslateService } from './application/google-translate.service';
import { LangchainTranslatorService } from './application/langchain-translator.service';
import { GOOGLE_TRANSLATE_PROVIDER } from './application/providers/google-translate.provider';
import { GEMINI_LLM_CHAIN_PROVIDER } from './application/providers/translation-chain.provider';
import { TranslatorController } from './http/translator.controller';

@Module({
  imports: [HttpModule],
  controllers: [TranslatorController],
})
export class TranslationModule {
  static register(type: Integration = 'azureOpenAI'): DynamicModule {
    const serviceMap = new Map<Integration, any>();
    serviceMap.set('azureOpenAI', AzureTranslatorService);
    serviceMap.set('langchain_googleChatModel', LangchainTranslatorService);
    serviceMap.set('google_translate', GoogleTranslateService);
    const translatorService = serviceMap.get(type) || AzureTranslatorService;

    const providers: Provider[] = [
      {
        provide: TRANSLATOR,
        useClass: translatorService,
      },
    ];

    if (type === 'langchain_googleChatModel') {
      providers.push(GEMINI_LLM_CHAIN_PROVIDER);
    } else if (type === 'google_translate') {
      providers.push(GOOGLE_TRANSLATE_PROVIDER);
    }

    return {
      module: TranslationModule,
      providers,
    };
  }
}
