export interface TranslateText {
  text: string;
  srcLanguageCode: string;
  targetLanguageCode: string;
}

export interface Translator {
  translate(input: TranslateText): Promise<{ text: string }>;
}
