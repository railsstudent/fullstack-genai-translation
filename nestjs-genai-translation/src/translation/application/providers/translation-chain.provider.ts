import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Provider } from '@nestjs/common';
import { GEMINI_CHAT_MODEL, GEMINI_CHAT_MODEL_LLM_CHAIN } from '../constants/translator.constant';

export const GEMINI_LLM_CHAIN_PROVIDER: Provider = {
  provide: GEMINI_CHAT_MODEL_LLM_CHAIN,
  useFactory: (chatModel: ChatGoogleGenerativeAI) => {
    const systemMessageTemplate = SystemMessagePromptTemplate.fromTemplate(
      'You are a helpful language translator that translates {srcLanguageName} to {targetLanguageName}',
    );
    const humanMessageTemplate = HumanMessagePromptTemplate.fromTemplate('{text}');
    const chatPrompt = ChatPromptTemplate.fromMessages([systemMessageTemplate, humanMessageTemplate]);

    const outputParser = new StringOutputParser();
    return chatPrompt.pipe(chatModel).pipe(outputParser);
  },
  inject: [GEMINI_CHAT_MODEL],
};
