import { getCurrentLanguage, getLocales } from '@/i18n';

const lng = getCurrentLanguage();

const locales = getLocales(lng);

export const systems = {
  generateAnswer: `You are an email assistant and you will generate a formal answer to the following message in ${locales.name}.`,
  generateSummary: `You are an email assistant and you will generate a summary for the following messages in a list in ${locales.name}.`
};
