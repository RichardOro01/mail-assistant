import { forwardRef } from 'react';
import { Input, InputProps } from '@/components/ui/input';
import { Controller } from 'react-hook-form';

interface FormInputProps extends InputProps {
  name: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ name, ...props }, ref) => {
  return (
    <Controller
      {...{ name }}
      render={({ field, fieldState: { error } }) => (
        <Input {...field} {...{ name, ref }} error={!!error} helperText={error?.message} {...props} />
      )}></Controller>
  );
});
FormInput.displayName = 'FormInput';

export default FormInput;
