import { z } from 'zod';

const createProductZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    description: z.string().optional(),
    price: z.number({
      required_error: 'Price is required',
    }).min(1, 'Price must be at least 1'),
    images: z.array(z.string().url('Invalid image url')).optional(),
    stockQuantity: z.number({
      required_error: 'Stock quantity is required',
    }).min(0, 'Stock quantity must be at least 0'),
    categoryId: z.string({
      required_error: 'Category id is required',
    }),
  }),
});


const updateProductZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().min(1, "Price must be at least 1").optional(),
    images: z.array(z.string().url("Invalid image url")).optional(),
    stockQuantity: z.number().min(0, "Stock quantity must be at least 0").optional(),
    // Accept string or object with _id
    categoryId: z
      .union([
        z.string(), // for just sending the id
        z.object({ _id: z.string() }), // for sending populated object
      ])
      .optional(),
  }),
});


export const ProductValidation = {
  createProductZodSchema,
  updateProductZodSchema,
};
