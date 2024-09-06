import { translationServer } from '@/i18n';
import { generalErrorCodes } from './error';
import { StandardError } from './custom-error';

export const getGeneralErrorMessageServer = async (error: unknown) => {
  const { t } = await translationServer('error');
  let message = '';
  if (typeof error === 'object' && error !== null && 'status' in error) {
    message = t('unknown');
  } else {
    message = t('network_error');
  }
  return message;
};

export const getStandardErrorMessageServer = async (error: unknown, translateFile?: string) => {
  if (error instanceof StandardError) {
    const isGeneral = generalErrorCodes.includes(error.code);
    const { t } = await translationServer(isGeneral ? 'error' : translateFile);
    const errorCode = isGeneral ? error.code : `error.${error.code}`;
    const message = t(errorCode, { defaultValue: error.message });
    return message;
  } else {
    return getGeneralErrorMessageServer(error);
  }
};
