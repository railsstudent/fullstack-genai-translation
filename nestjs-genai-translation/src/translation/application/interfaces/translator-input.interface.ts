import { LanguageCodeType } from '../enums/languages.enum';

export interface TranslateInput {
  text: string;
  srcLanguageCode: LanguageCodeType;
  targetLanguageCode: LanguageCodeType;
}
