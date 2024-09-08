import { translationServer } from '@/i18n';
import { generalErrorCodes, isInstanceOfStandardError } from './error';

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
  if (isInstanceOfStandardError(error)) {
    const isGeneral = generalErrorCodes.includes(error.detail.code);
    const { t } = await translationServer(isGeneral ? 'error' : translateFile);
    const errorCode = isGeneral ? error.detail.code : `error.${error.detail.code}`;
    const message = t(errorCode, { defaultValue: error.detail.message });
    return message;
  } else {
    return getGeneralErrorMessageServer(error);
  }
};
