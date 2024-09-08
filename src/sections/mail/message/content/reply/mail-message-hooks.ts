import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IReplyEmailForm } from '@/types/smtp';

export const useMailMessageReplyForm = () => {
  const defaultValues: IReplyEmailForm = {
    text: ''
  };

  const schema: z.ZodSchema<IReplyEmailForm> = z.object({
    text: z.string().min(1)
  });

  const methods = useForm({ resolver: zodResolver(schema), defaultValues });
  return methods;
};
