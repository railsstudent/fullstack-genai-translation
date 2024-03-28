import dotenv from 'dotenv';
import { APP_ENV_NAMES } from '~core/enums/app_env_names.enum';
import { Integration } from '~core/types/integration.type';

dotenv.config();

export const env = {
  PORT: parseInt(process.env.PORT || '3000'),
  APP_ENV: (process.env.APP_ENV || APP_ENV_NAMES.PRODUCTION) as APP_ENV_NAMES,
  AZURE_OPENAI_TRANSLATOR: {
    KEY: process.env.AZURE_OPENAI_TRANSLATOR_API_KEY || '',
    URL: process.env.AZURE_OPENAI_TRANSLATOR_URL || '',
    LOCATION: process.env.AZURE_OPENAI_LOCATION || 'eastasia',
    VERSION: process.env.AZURE_OPENAI_TRANSLATOR_API_VERSION || '3.0',
  },
  GEMINI: {
    API_KEY: process.env.GOOGLE_GEMINI_API_KEY || '',
    MODEL_NAME: process.env.GOOGLE_GEMINI_MODEL || '',
  },
  AI_SERVICE: (process.env.AI_SERVICE || 'google_translate') as Integration,
  GOOGLE: {
    PROJECT_ID: process.env.GOOGLE_PROJECT_ID || '',
  },
};
