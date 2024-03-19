import { z } from 'zod';
import { AZURE_OPENAI_LANGUAGE_CODES } from '~translation/constants/azure-openai/language-codes.constant';

const [first, ...rest] = AZURE_OPENAI_LANGUAGE_CODES.map(({ code }) => code);
export const LanguageCodeEnum = z.enum([first, ...rest]);
export type LanguageCodeType = z.infer<typeof LanguageCodeEnum>;
