'use client';

import { useCallback, useEffect, useState } from 'react';
import { I18NContext } from './i18n-context';
import { updateCookieLanguage } from '../actions';
import { cookieI18Name, languageObjects, languages } from '../settings';
import { LanguageObject, LanguageOptions } from '../types';
import { debugRendering } from '@/lib/debug/debuggers';
import { getCookies } from '@/lib/utils/cookies';

// ----------------------------------------------------------------------

type I18NProviderProps = {
  children: React.ReactNode;
  lng: LanguageOptions;
};

export function I18NProvider({ children, lng }: I18NProviderProps) {
  debugRendering('I18NProvider');
  const [language, setLanguage] = useState(lng);

  const changeLanguage = useCallback((lng: LanguageOptions) => {
    if (languages.includes(lng)) setLanguage(lng);
  }, []);

  const getLocales = useCallback(() => {
    return languageObjects.find(({ code }) => code === language) as LanguageObject;
  }, [language]);

  useEffect(() => {
    if (getCookies()[cookieI18Name] != language) {
      updateCookieLanguage(language);
    }
  }, [language]);

  return <I18NContext.Provider value={{ language, changeLanguage, getLocales }}>{children}</I18NContext.Provider>;
}
