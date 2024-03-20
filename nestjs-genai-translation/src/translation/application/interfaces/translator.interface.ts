import { TranslateInput } from './translator-input.interface';

export interface Translator {
  translate(input: TranslateInput): Promise<{ text: string }>;
}
