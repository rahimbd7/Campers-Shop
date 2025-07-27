import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }).email('Invalid email format'),
    password: z.string({
      required_error: 'Password is required',
    }).min(6, 'Password must be at least 6 characters'),
    contactNo: z.string({
      required_error: 'Contact number is required',
    }),
    address: z.string().optional(),
    // profile_img: z.string().optional(),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email('Invalid email format').optional(),
    password: z
      .string()
      .optional()
      .transform((val) => (val === '' ? undefined : val))
      .refine((val) => !val || val.length >= 6, {
        message: 'Password must be at least 6 characters',
      }),
    role: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    isDeleted: z.coerce.boolean().optional(),
  }),
});



export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema
}