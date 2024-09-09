import { languages } from './settings';

export interface I18NProviderProps {
  language: LanguageOptions;
  changeLanguage: (lng: LanguageOptions) => void;
  getLocales: () => LanguageObject;
}

export type LanguageOptions = (typeof languages)[number];

export interface LanguageObject {
  readonly code: string;
  readonly name: string;
}
