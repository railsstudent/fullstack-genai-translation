import { z } from 'zod';
import { LANGUAGE_CODES } from '../constants/language-codes.constant';

const [first, ...rest] = LANGUAGE_CODES.map(({ code }) => code);
export const LanguageCodeEnum = z.enum([first, ...rest]);
export type LanguageCodeType = z.infer<typeof LanguageCodeEnum>;
