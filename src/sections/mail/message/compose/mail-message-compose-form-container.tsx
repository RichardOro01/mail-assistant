import { emailService } from '@/services';
import { useHandleError } from '@/lib/error/hooks';
import FormProvider from '@/components/form-hook/form-provider';
import MailMessageComposeForm from './mail-message-compose-form';
import { useMailMessageForm } from './mail-message-hooks';

const MailMessageComposeFormContainer = () => {
  const { handleStandardError } = useHandleError();

  const methods = useMailMessageForm();

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await emailService.sendEmail(data);

      console.log('Email sent:', response);
    } catch (error) {
      handleStandardError(error, { showToast: true });
    }
  });

  return (
    <FormProvider {...{ methods, onSubmit }}>
      <MailMessageComposeForm />
    </FormProvider>
  );
};

export default MailMessageComposeFormContainer;
