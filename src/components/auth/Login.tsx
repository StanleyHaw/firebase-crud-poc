import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { authSchema } from '@/utils/constant';
import {
  handleAuthErrorMessage,
  handleAuthSuccessMessage
} from '@/utils/toastMessage';
import { handleLogin } from '@/config/auth';
import useToast from '@/hooks/useToast';

import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@components/ui/PasswordInput';

import { cn } from '@/lib/utils';

function LoginForm() {
  const { setLoading } = useToast();

  const emptyValues = {
    email: '',
    password: ''
  };

  type LoginFormSchema = z.infer<typeof authSchema>;

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: emptyValues
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = form;

  async function onSubmit(data: z.infer<typeof authSchema>) {
    setLoading(true);

    const isValidAccount = await handleLogin(data);
    if (isValidAccount) {
      handleAuthSuccessMessage({ type: 'login' });
    } else {
      handleAuthErrorMessage({ type: 'login' });
    }

    setLoading(false);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <FormField
            control={control}
            name="email"
            render={({ field: { value, onBlur, ...field } }) => {
              const [isFocused, setIsFocused] = useState(false);
              return (
                <FormItem className="relative grid grid-2">
                  <FormLabel
                    className={cn(
                      'form-input-label',
                      !(value || isFocused) && 'form-input-typing',
                      isFocused && 'text-indigo-400'
                    )}
                  >
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      onBlur={() => setIsFocused(false)}
                      onFocus={() => setIsFocused(true)}
                      className="focus-visible:ring-indigo-400"
                      {...field}
                    />
                  </FormControl>
                  {errors.email && (
                    <FormMessage className="errors-message text-xs" />
                  )}
                </FormItem>
              );
            }}
          />
          <FormField
            control={control}
            name="password"
            render={({ field: { value, onBlur, ...field } }) => {
              const [isFocused, setIsFocused] = useState(false);
              return (
                <FormItem className="relative grid grid-2">
                  <FormLabel
                    className={cn(
                      'form-input-label',
                      !(value || isFocused) && 'form-input-typing',
                      isFocused && 'text-indigo-400'
                    )}
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      onBlur={() => setIsFocused(false)}
                      onFocus={() => setIsFocused(true)}
                      className="focus-visible:ring-indigo-400"
                      {...field}
                    />
                  </FormControl>
                  {errors.password && (
                    <FormMessage className="errors-message text-xs" />
                  )}
                  <Link
                    to="#"
                    className="ml-auto inline-block text-xs text-gray-400 underline font-light hover:text-indigo-400"
                  >
                    Forgot your password?
                  </Link>
                </FormItem>
              );
            }}
          />
          <Button
            className="w-full text-white bg-indigo-600 hover:text-white hover:bg-indigo-700"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Form>
    </>
  );
}

export default LoginForm;
