export interface Translator {
  translate(text: string, srcLanguageCode: string, targetLanguageCode: string): Promise<string>;
}
