import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IReplyEmailForm } from '@/types/smtp';

interface UseMailMessageReplyFormOptions {
  defaultTo: string;
}

export const useMailMessageReplyForm = ({ defaultTo }: UseMailMessageReplyFormOptions) => {
  const defaultValues: IReplyEmailForm = {
    to: defaultTo,
    text: ''
  };

  const schema: z.ZodSchema<IReplyEmailForm> = z.object({
    to: z.string().min(1).email(),
    text: z.string().min(1)
  });

  const methods = useForm({ resolver: zodResolver(schema), defaultValues });
  return methods;
};
