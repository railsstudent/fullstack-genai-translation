import { z } from 'zod';

export const translateTextSchema = z
  .object({
    text: z.string(),
    srcLanguageCode: z.string(),
    targetLanguageCode: z.string(),
  })
  .required();

export type TranslateTextDto = z.infer<typeof translateTextSchema>;
