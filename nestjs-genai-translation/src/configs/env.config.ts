import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: parseInt(process.env.PORT || '3000'),
  AZURE_OPENAI_TRANSLATOR: {
    KEY: process.env.AZURE_OPENAI_TRANSLATOR_API_KEY,
    URL: process.env.AZURE_OPENAI_TRANSLATOR_URL,
    LOCATION: process.env.AZURE_OPENAI_LOCATION || 'eastasia',
    VERSION: process.env.AZURE_OPENAI_TRANSLATOR_API_VERSION || '3.0',
  },
};
