import { TranslateTextDto } from '~translation/http/dtos/translate-text.dto';

export interface Translator {
  translate(input: TranslateTextDto): Promise<{ text: string }>;
}
