import { z } from 'zod';
import { ZOD_LANGUAGE_CODES } from '~translation/application/enums/languages.enum';

export const translateTextSchema = z
  .object({
    text: z.string({
      required_error: 'Text is required',
    }),
    srcLanguageCode: ZOD_LANGUAGE_CODES,
    targetLanguageCode: ZOD_LANGUAGE_CODES,
  })
  .required();

export type TranslateTextDto = z.infer<typeof translateTextSchema>;
