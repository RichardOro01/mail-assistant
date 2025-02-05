import { getCurrentLanguage, getLocales } from '@/i18n';

const getLanguageName = () => {
  const lng = getCurrentLanguage();
  const locales = getLocales(lng);
  return locales.name;
};

export const systems = {
  generateAnswer: () => {
    const language = getLanguageName();
    return `You are an email assistant, and your job is to generate the best possible response for the email you receive using the language ${language}.`;
  },
  generateSummary: () => {
    const language = getLanguageName();
    return `You are an email assistant and you will generate a summary for the following messages in a list in ${language}.`;
  },
  getMessagePriority: () => {
    return 'You are an email assistant and you will prioritize the following message as: low, medium or high.';
  }
};
