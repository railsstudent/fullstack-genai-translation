import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { env } from '~configs/env.config';
import { APP_ENV_NAMES } from '~core/enums/app_env_names.enum';
import { Integration } from '~core/types/integration.type';
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
    console.log('type', type);
    const isProduction = env.APP_ENV === APP_ENV_NAMES.PRODUCTION;
    console.log('isProduction', isProduction);

    // google_translation works in local environment. Default to azureOpenAI in production
    const serviceType = isProduction && type === 'google_translate' ? 'azureOpenAI' : type;
    const providers = TranslationModule.getProviders(isProduction, serviceType);

    return {
      module: TranslationModule,
      providers,
    };
  }

  private static getProviders(isProduction: boolean, serviceType: Integration) {
    const translatorService = TranslationModule.getService(isProduction, serviceType);
    const providers: Provider[] = [
      {
        provide: TRANSLATOR,
        useClass: translatorService,
      },
    ];

    if (serviceType === 'langchain_googleChatModel') {
      providers.push(GEMINI_LLM_CHAIN_PROVIDER);
    } else if (serviceType === 'google_translate') {
      providers.push(GOOGLE_TRANSLATE_PROVIDER);
    }
    return providers;
  }

  private static getService(isProduction: boolean, serviceType: Integration) {
    const serviceMap = new Map<Integration, any>();
    serviceMap.set('azureOpenAI', AzureTranslatorService);
    serviceMap.set('langchain_googleChatModel', LangchainTranslatorService);
    if (!isProduction) {
      serviceMap.set('google_translate', GoogleTranslateService);
    }
    return serviceMap.get(serviceType) || LangchainTranslatorService;
  }
}
