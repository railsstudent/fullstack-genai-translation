export interface Translate {
    text: string;
    from: string;
    to: string;
    isValid: boolean;
}

export interface TranslationModel {
    text: string;
    from: string;
    to: string;
    isValid: boolean;
    isLoading: boolean;
}