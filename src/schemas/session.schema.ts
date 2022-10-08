import { z } from 'zod';

export const createSessionSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is a required field',
    }),
    password: z.string({
      required_error: 'Password is a required field',
    }),
  }),
});
