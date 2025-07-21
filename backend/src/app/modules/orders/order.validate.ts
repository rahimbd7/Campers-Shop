import { z } from 'zod';

// Schema for individual order item
const orderItemSchema = z.object({
  productId: z.string({
    required_error: 'Product ID is required',
    invalid_type_error: 'Product ID must be a string',
  }),
  quantity: z.number({
    required_error: 'Quantity is required',
    invalid_type_error: 'Quantity must be a number',
  }),
  priceAtOrderTime: z.number({
    required_error: 'Price at order time is required',
    invalid_type_error: 'Price must be a number',
  }),
});

// Create Order Schema wrapped in z.object({ body: ... })
export const createOrderZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User ID is required',
      invalid_type_error: 'User ID must be a string',
    }),
    items: z
      .array(orderItemSchema, {
        required_error: 'Items are required',
        invalid_type_error: 'Items must be an array',
      })
      .min(1, 'At least one item is required'),
    totalAmount: z.number({
      required_error: 'Total amount is required',
      invalid_type_error: 'Total amount must be a number',
    }),
    paymentMethod: z.enum(['cod', 'stripe', 'bkash'], {
      required_error: 'Payment method is required',
      invalid_type_error: 'Payment method must be either cod, stripe, or bkash',
    }),
    deliveryAddress: z.string({
      required_error: 'Delivery address is required',
      invalid_type_error: 'Delivery address must be a string',
    }),
    contactPhone: z.string({
      required_error: 'Contact phone is required',
      invalid_type_error: 'Contact phone must be a string',
    }),
    status: z
      .enum(['pending', 'confirmed', 'shipped', 'delivered'])
      .optional(),
  }),
});

// Update Order Schema wrapped in z.object({ body: ... })
export const updateOrderZodSchema = z.object({
  body: z.object({
    items: z.array(orderItemSchema).optional(),
    totalAmount: z.number().optional(),
    paymentMethod: z.enum(['cod', 'stripe', 'bkash']).optional(),
    deliveryAddress: z.string().optional(),
    contactPhone: z.string().optional(),
    status: z.enum(['pending', 'confirmed', 'shipped', 'delivered']).optional(),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
  updateOrderZodSchema,
};
