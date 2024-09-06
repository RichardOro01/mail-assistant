import { useContext } from 'react';
import { MailContext } from './mail-context';

export const useMailContext = () => {
  const context = useContext(MailContext);
  if (!('selectedMail' in context)) throw new Error('MailContext must be inside MailProvider');
  return context;
};
