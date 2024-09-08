import { useTranslationClient } from '@/i18n/client';
import { useCallback } from 'react';
import { generalErrorCodes, isInstanceOfStandardError } from './error';
import { IHandleErrorOptions } from './types';
import { toast } from '@/hooks/use-toast';

export const useHandleError = (translateFile?: string) => {
  const { t } = useTranslationClient('error');
  const { t: t2 } = useTranslationClient(translateFile);

  const handleGeneralError = useCallback(
    (error: unknown, options?: IHandleErrorOptions) => {
      let message = '';
      if (typeof error === 'object' && error !== null && 'status' in error) {
        message = t('unknown');
      } else {
        message = t('network_error');
      }
      if (options?.showToast) toast({ title: message, variant: 'destructive' });
      return message;
    },
    [t]
  );

  const handleStandardError = useCallback(
    (error: unknown, options?: IHandleErrorOptions) => {
      if (isInstanceOfStandardError(error)) {
        const isGeneral = generalErrorCodes.includes(error.detail.code);
        const tFunction = isGeneral ? t : t2;
        const errorCode = isGeneral ? error.detail.code : `error.${error.detail.code}`;
        const message = tFunction(errorCode, { defaultValue: error.detail.message });
        if (options?.showToast) toast({ title: message, variant: 'destructive' });
        return message;
      } else {
        return handleGeneralError(error, options);
      }
    },
    [handleGeneralError, t2, t]
  );

  return { handleGeneralError, handleStandardError };
};
