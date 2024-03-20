import { z } from 'zod';
import { LanguageCodeEnum } from '~translation/application/enums/languages.enum';

export const translateTextSchema = z
  .object({
    text: z.string({
      required_error: 'Text is required',
    }),
    srcLanguageCode: LanguageCodeEnum,
    targetLanguageCode: LanguageCodeEnum,
  })
  .required();

export type TranslateTextDto = z.infer<typeof translateTextSchema>;
