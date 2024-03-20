import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import { AzureTranslatorService } from './application/azure-translator.service';
import { TRANSLATOR } from './application/constants/translator.constant';
import { TranslatorController } from './http/translator.controller';
import { Integration } from './types/integration.type';

@Module({
  imports: [HttpModule],
  controllers: [TranslatorController],
})
export class TranslationModule {
  static register(type: Integration = 'azureOpenAI'): DynamicModule {
    const translatorService = type === 'azureOpenAI' ? AzureTranslatorService : AzureTranslatorService;

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
