import { TranslationResult } from './translation-result.interface';

export interface Translate {
    text: string;
    from: string;
    to: string;
    isValid: boolean;
}

export interface TranslationModel {
    from: string;
    to: string;
    isLoading: boolean;
    translationList: TranslationResult[];
}

export interface TranslationBoxModel {
    text: string;
    isLoading: boolean;
    buttonText: string;
}