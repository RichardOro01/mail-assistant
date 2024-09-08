import { Textarea } from '../../../../components/ui/textarea';
import { Label } from '../../../../components/ui/label';
import FormInput from '@/components/form-hook/form-input';

const MailMessageComposeForm = () => {
  return (
    <div className='flex flex-col mx-5 my-3 gap-3'>
      <div className='flex items-center gap-4 mb-4'>
        <Label htmlFor='to' className='text-lg font-semibold'>
          To
        </Label>
        <FormInput
          name='to'
          id='to'
          className='flex-1 bg-transparent text-lg font-bold border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-gray-400'
        />
      </div>
      <FormInput
        name='subject'
        placeholder='Subject'
        className='w-full px-0 mb-4 text-lg font-bold border-none focus-visible:ring-0 focus-visible:ring-offset-0'
      />
      <Textarea
        autoSize
        placeholder='Say hello'
        rows={5}
        className='w-full px-0 text-lg font-medium resize-none bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0'
        style={{ overflow: 'hidden' }}
      />
      <div className='flex gap-4'>
        <button className='font-semibold' type='submit'>
          Send
        </button>
        <button>Send later</button>
      </div>
    </div>
  );
};

export default MailMessageComposeForm;
