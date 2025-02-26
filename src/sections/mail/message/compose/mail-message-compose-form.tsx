import { Label } from '../../../../components/ui/label';
import FormInput from '@/components/form-hook/form-input';
import MailMessageComposeButtons from './mail-message-compose-buttons';
import FormTextarea from '@/components/form-hook/form-textarea';
import { useTranslationClient } from '@/i18n/client';
import { useSpeechToTextAI } from '@/services/hooks';
import { useHandleError } from '@/lib/error/hooks';
import { useFormContext } from 'react-hook-form';
import { IReplyEmailForm } from '@/types/smtp';
import { useCallback } from 'react';
import { EMAIL_SUBJECT_LIMIT, EMAIL_TEXT_LIMIT, EMAIL_TO_LIMIT } from '@/services/email/validation-consts';

const MailMessageComposeForm = () => {
  const { t } = useTranslationClient('message-compose');
  const { handleStandardError } = useHandleError();
  const { getValues, setValue } = useFormContext<IReplyEmailForm>();

  const { generateTextFromAudio, isLoading: speechToTexIsLoading } = useSpeechToTextAI();

  const handleRecord = useCallback(
    async (audio: Blob) => {
      try {
        const text = await generateTextFromAudio(audio);
        if (text) {
          const currentTextValue = getValues('text');
          setValue('text', `${currentTextValue} ${text}`);
        }
      } catch (e) {
        handleStandardError(e, { showToast: true });
      }
    },
    [generateTextFromAudio, getValues, handleStandardError, setValue]
  );

  return (
    <div className='flex flex-col mx-5 my-3 gap-3'>
      <div className='flex items-center gap-4 mb-4'>
        <Label htmlFor='to' className='text-lg font-semibold'>
          {t('to')}
        </Label>
        <FormInput
          name='to'
          id='to'
          className='flex-1 bg-transparent text-lg font-bold border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-gray-400'
          maxLength={EMAIL_TO_LIMIT}
        />
      </div>
      <FormInput
        name='subject'
        placeholder={t('subject_placeholder')}
        className='w-full px-0 mb-4 text-lg font-bold border-none focus-visible:ring-0 focus-visible:ring-offset-0'
        maxLength={EMAIL_SUBJECT_LIMIT}
      />
      <FormTextarea
        name='text'
        autoSize
        placeholder={t('text_placeholder')}
        rows={5}
        className='w-full px-0 text-lg font-medium resize-none bg-transparent overflow-hidden border-none'
        maxLength={EMAIL_TEXT_LIMIT}
      />
      <MailMessageComposeButtons {...{ handleRecord, speechToTexIsLoading }} />
    </div>
  );
};

export default MailMessageComposeForm;
