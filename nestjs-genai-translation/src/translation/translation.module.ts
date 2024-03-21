import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { AzureTranslatorService } from './application/azure-translator.service';
import { TRANSLATOR } from './application/constants/translator.constant';
import { TranslatorController } from './http/translator.controller';
import { Integration } from './types/integration.type';
import { LangchainTranslatorService } from './application/langchain-translator.service';
import { GEMINI_CHAT_MODEL_PROVIDER } from './application/providers/gemini.provider';

@Module({
  imports: [HttpModule],
  controllers: [TranslatorController],
})
export class TranslationModule {
  static register(type: Integration = 'azureOpenAI'): DynamicModule {
    const serviceMap = new Map<Integration, any>();
    serviceMap.set('azureOpenAI', AzureTranslatorService);
    serviceMap.set('langchain_googleChatModel', LangchainTranslatorService);
    const translatorService = serviceMap.get(type) || AzureTranslatorService;

    const providers: Provider[] = [
      {
        provide: TRANSLATOR,
        useClass: translatorService,
      },
    ];

    if (type === 'langchain_googleChatModel') {
      providers.push(GEMINI_CHAT_MODEL_PROVIDER);
    }

    return {
      module: TranslationModule,
      providers,
    };
  }
}
