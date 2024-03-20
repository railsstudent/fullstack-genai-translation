import { TranslationResult } from './translation-result.interface';
import { TranslateInput } from './translator-input.interface';

export interface Translator {
  translate(input: TranslateInput): Promise<TranslationResult>;
}
