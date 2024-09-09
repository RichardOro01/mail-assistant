import { getCurrentLanguage, getLocales } from '@/i18n';

const getLanguageName = () => {
  const lng = getCurrentLanguage();
  const locales = getLocales(lng);
  return locales.name;
};

export const systems = {
  generateAnswer: () => {
    const language = getLanguageName();
    return `You are an email assistant and you will generate a formal answer to the following message in ${language}.`;
  },
  generateSummary: () => {
    const language = getLanguageName();
    return `You are an email assistant and you will generate a summary for the following messages in a list in ${language}.`;
  }
};
