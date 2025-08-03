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


// Helper function to convert empty string to undefined
const optionalString = () =>
  z.string().optional().transform((val) => (val === "" ? undefined : val));


const updateUserZodSchema = z.object({
  body: z.object({
    name: optionalString(),
    email: optionalString(),
    password: optionalString()
      .refine((val) => !val || val.length >= 6, {
        message: "Password must be at least 6 characters",
      }),
    role: optionalString(),
    contactNo: optionalString(),
    address: optionalString(),
    isDeleted: z.union([z.string(), z.boolean()])
      .optional()
      .transform((val) => {
        if (val === "" || val === undefined) return undefined;
        if (val === "true") return true;
        if (val === "false") return false;
        return val;
      }),
  }),
});




export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema
}