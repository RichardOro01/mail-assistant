import { forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import { Textarea, TextareaProps } from '../ui/textarea';

interface TextareaInputProps extends TextareaProps {
  name: string;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, TextareaInputProps>(({ name, ...props }, ref) => {
  return (
    <Controller
      {...{ name }}
      render={({ field, fieldState: { error } }) => (
        <Textarea {...field} {...{ name, ref }} error={!!error} helperText={error?.message} {...props} />
      )}></Controller>
  );
});

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
