import { z } from 'zod';

export const createUserSchema = z.object({
  body: z
    .object({
      firstName: z.string({
        required_error: 'First name is a required field',
      }),
      lastName: z.string({
        required_error: 'Last name is a required field',
      }),
      email: z
        .string({
          required_error: 'Email is a required field',
        })
        .email({
          message: 'Email must be a valid email',
        }),
      password: z.string({
        required_error: 'Password is a required field',
      }),
      passwordConfirmation: z.string({
        required_error: 'Password confirmation is required',
      }),
    })
    .refine(data => data.password === data.passwordConfirmation, {
      message: 'Passwords do not match',
      path: ['passwordConfirmation'],
    }),
});

export type CreateUserInput = Omit<
  z.TypeOf<typeof createUserSchema>,
  'body.passwordConfirmation'
>;
