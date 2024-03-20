import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import { TRANSLATOR } from './constants/translator.constant';
import { TranslatorController } from './http/translator.controller';
import { AzureOpenAITranslatorService } from './services/azure-openai/translator.service';

@Module({
  imports: [HttpModule],
  controllers: [TranslatorController],
})
export class TranslationModule {
  static register(
    type: 'azureOpenAi' | 'langchain_googlechatmodel' | 'google_tranlsate' = 'azureOpenAi',
  ): DynamicModule {
    const translatorService = type === 'azureOpenAi' ? AzureOpenAITranslatorService : AzureOpenAITranslatorService;

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
