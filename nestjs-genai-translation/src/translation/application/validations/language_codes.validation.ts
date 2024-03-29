import { z } from 'zod';

const LANGUAGE_CODES = {
  English: 'en',
  Spanish: 'es',
  'Simplified Chinese': 'zh-Hans',
  'Traditional Chinese': 'zh-Hant',
  Vietnamese: 'vi',
  Japanese: 'ja',
} as const;

export const ZOD_LANGUAGE_CODES = z.nativeEnum(LANGUAGE_CODES, {
  required_error: 'Language code is required',
  invalid_type_error: 'Language code is invalid',
});
export type LanguageCodesType = z.infer<typeof ZOD_LANGUAGE_CODES>;
