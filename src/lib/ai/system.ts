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
    return `Classify the following message as 'Low,' 'Medium,' or 'High' priority based on its urgency, importance, and required action.
              Low: General information, no immediate action needed.
              Medium: Requires attention but is not urgent; follow-up may be needed.
              High: Critical or urgent, requires immediate action.'
    `;
  }
};
