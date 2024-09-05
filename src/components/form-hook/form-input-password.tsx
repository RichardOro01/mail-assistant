import { forwardRef } from 'react';
import InputPassword, { InputPasswordProps } from '../ui/input-password';
import { Controller } from 'react-hook-form';

interface FormInputPasswordProps extends InputPasswordProps {
  name: string;
}

const FormInputPassword = forwardRef<HTMLInputElement, FormInputPasswordProps>(({ name, ...props }, ref) => {
  return (
    <Controller
      {...{ name }}
      render={({ field, fieldState: { error } }) => (
        <InputPassword {...field} {...{ name, ref }} error={!!error} helperText={error?.message} {...props} />
      )}></Controller>
  );
});
FormInputPassword.displayName = 'FormInputPassword';

export default FormInputPassword;
