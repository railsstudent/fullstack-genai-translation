import { HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Provider } from '@nestjs/common';
import { env } from '~configs/env.config';
import { GEMINI_CHAT_MODEL_LLM_CHAIN } from '../constants/translator.constant';

const chatModel = new ChatGoogleGenerativeAI({
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

export const GEMINI_LLM_CHAIN_PROVIDER: Provider = {
  provide: GEMINI_CHAT_MODEL_LLM_CHAIN,
  useFactory: () => {
    const systemMessageTemplate = SystemMessagePromptTemplate.fromTemplate(
      'You are a helpful language translator that translates {srcLanguageName} to {targetLanguageName}',
    );
    const humanMessageTemplate = HumanMessagePromptTemplate.fromTemplate('{text}');
    const chatPrompt = ChatPromptTemplate.fromMessages([systemMessageTemplate, humanMessageTemplate]);

    const outputParser = new StringOutputParser();
    return chatPrompt.pipe(chatModel).pipe(outputParser);
  },
};
