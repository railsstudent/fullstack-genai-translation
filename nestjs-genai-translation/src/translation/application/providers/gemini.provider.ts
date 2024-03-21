import { HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Provider } from '@nestjs/common';
import { env } from '~configs/env.config';
import { GEMINI_CHAT_MODEL } from '../constants/translator.constant';

const proModel = new ChatGoogleGenerativeAI({
  modelName: env.GEMINI.MODEL_NAME,
  maxOutputTokens: 128,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
  temperature: 0,
  topK: 3,
  topP: 0.5,
  apiKey: env.GEMINI.API_KEY,
});

export const GEMINI_CHAT_MODEL_PROVIDER: Provider = {
  provide: GEMINI_CHAT_MODEL,
  useValue: proModel,
};
