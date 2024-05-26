import { z } from 'zod';

export const genderList = ['Male', 'Female'];

export const authSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required..'
    })
    .email({
      message: 'Invalid email address.'
    }),
  password: z
    .string()
    .min(1, {
      message: 'Password is required..'
    })
    .min(6, {
      message: 'password must be at least 6 characters.'
    })
});

export const signUpSchema = authSchema
  .extend({
    username: z
      .string()
      .min(1, {
        message: 'Username is required.'
      })
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'Username cannot contain special characters or spaces'
      ),
    confirmPassword: z.string().min(1, {
      message: "Passwords don't match."
    }),
    dateOfBirth: z.date({
      message: 'A date of birth is required.'
    }),
    termsOfService: z.boolean({
      required_error: 'You must agree to the Terms of Service'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword']
  })
  .refine((data) => data.termsOfService === true, {
    message: 'You must agree to the Terms of Service',
    path: ['termsOfService']
  });
