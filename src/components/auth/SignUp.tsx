import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { signUpSchema } from '@utils/constant';

import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/Popover';
import { FiCalendar } from 'react-icons/fi';
import { Checkbox } from '@/components/ui/Checkbox';

import { cn } from '@/lib/utils';

function SignUpForm() {
  const emptyValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: undefined,
    termsOfService: false
  };

  type SignUpFormSchema = z.infer<typeof signUpSchema>;

  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: emptyValues
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = form;

  function onSubmit(data: z.infer<typeof signUpSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={control}
          name="username"
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
                  Username*
                </FormLabel>
                <FormControl>
                  <Input
                    onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)}
                    type="text"
                    className="focus-visible:ring-indigo-400"
                    {...field}
                  />
                </FormControl>
                {errors.username && (
                  <FormMessage className="errors-message text-xs" />
                )}
              </FormItem>
            );
          }}
        />
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
                  Email*
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
                  Password*
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
              </FormItem>
            );
          }}
        />
        <FormField
          control={control}
          name="confirmPassword"
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
                  Confirm password*
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)}
                    className="focus-visible:ring-indigo-400"
                    {...field}
                  />
                </FormControl>
                {errors.confirmPassword && (
                  <FormMessage className="errors-message text-xs" />
                )}
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field: { onBlur, ...field } }) => {
            const [isCalendarOpen, setIsCalendarOpen] = useState(false);
            return (
              <FormItem className="relative grid grid-2">
                <FormLabel
                  className={cn(
                    'form-input-label',
                    !(isCalendarOpen || field.value) && 'form-input-typing',
                    isCalendarOpen && 'text-indigo-400'
                  )}
                >
                  Date of birth*
                </FormLabel>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'flex relative justify-start w-full font-normal',
                          isCalendarOpen &&
                            'ring-2 ring-offset-2 ring-indigo-400'
                        )}
                      >
                        {field.value && format(field.value, 'yyyy / MM / dd')}
                        <FiCalendar
                          className={cn(
                            'absolute right-0 top-0 mx-3 my-2.5 h-4 w-4 text-gray-500',
                            isCalendarOpen && 'text-indigo-400'
                          )}
                        />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(e) => {
                        field.onChange(e);
                        setIsCalendarOpen(false);
                      }}
                      captionLayout="dropdown-buttons"
                      fromYear={1900}
                      toYear={2030}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.dateOfBirth && (
                  <FormMessage className="errors-message text-xs" />
                )}
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="termsOfService"
          render={({ field }) => {
            return (
              <FormItem className="relative flex flex-row items-center gap-4 ">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={cn(errors.termsOfService && 'border-red-500')}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  I agree with Terms of Service, Privacy Policy, and default
                  Notification Settings.
                </FormLabel>
                {errors.termsOfService && (
                  <FormMessage className="errors-message text-xs" />
                )}
              </FormItem>
            );
          }}
        />
        <Button
          className="w-full text-white bg-indigo-600 hover:text-white hover:bg-indigo-700"
          type="submit"
        >
          Sign up
        </Button>
      </form>
    </Form>
  );
}

export default SignUpForm;
