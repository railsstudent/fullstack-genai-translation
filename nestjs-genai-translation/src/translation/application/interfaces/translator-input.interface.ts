import { LanguageCodesType } from '../validations/language_codes.validation';

export interface TranslateInput {
  text: string;
  srcLanguageCode: LanguageCodesType;
  targetLanguageCode: LanguageCodesType;
}
