import { TranslateTextDto } from '~translation/dtos/translate-text.dto';

export interface Translator {
  translate(input: TranslateTextDto): Promise<{ text: string }>;
}
