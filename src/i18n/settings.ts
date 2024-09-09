import { LanguageObject, LanguageOptions } from './types';

export const languageObjects: LanguageObject[] = [
  {
    code: 'en',
    name: 'English'
  },
  {
    code: 'es',
    name: 'Spanish'
  }
] as const;

export const fallbackLng = languageObjects[0].code;
export const languages = languageObjects.map(({ code }) => code);
export const defaultNS = 'general';
export const cookieI18Name = 'i18next';

export function getOptions(lng: LanguageOptions = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  };
}
