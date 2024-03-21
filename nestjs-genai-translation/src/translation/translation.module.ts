import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import { AzureTranslatorService } from './application/azure-translator.service';
import { TRANSLATOR } from './application/constants/translator.constant';
import { TranslatorController } from './http/translator.controller';
import { Integration } from './types/integration.type';
import { LangchainTranslatorService } from './application/langchain-translator.service';

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

    return {
      module: TranslationModule,
      providers: [
        {
          provide: TRANSLATOR,
          useClass: translatorService,
        },
      ],
    };
  }
}
