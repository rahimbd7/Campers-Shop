import { z } from 'zod';

const addToCartZodSchema = z.object({
  params: z.object({
    userId: z.string().uuid('User ID must be a valid UUID'),
  }),
  body: z.object({
    productId: z.string().uuid('Product ID must be a valid UUID'),
    quantity: z.number().int('Quantity must be an integer').min(1, 'Quantity must be at least 1'),
  }),
});

const removeFromCartZodSchema = z.object({
  params: z.object({
    userId: z.string().uuid('User ID must be a valid UUID'),
  }),
  body: z.object({
    productId: z.string().uuid('Product ID must be a valid UUID'),
  }),
});

const mergeCartZodSchema = z.object({
  params: z.object({
    userId: z.string().uuid('User ID must be a valid UUID'),
  }),
  body: z.object({
    cartItems: z.array(
      z.object({
        productId: z.string().uuid('Product ID must be a valid UUID'),
        quantity: z.number().int('Quantity must be an integer').min(1, 'Quantity must be at least 1'),
      })
    ),
  }),
});

const getCartByUserZodSchema = z.object({
  params: z.object({
    userId: z.string().uuid('User ID must be a valid UUID'),
  }),
});

const clearCartZodSchema = z.object({
  params: z.object({
    userId: z.string().uuid('User ID must be a valid UUID'),
  }),
});

export const CartValidate = {
  addToCart: addToCartZodSchema,
  removeFromCart: removeFromCartZodSchema,
  mergeCart: mergeCartZodSchema,
  getCartByUser: getCartByUserZodSchema,
  clearCart: clearCartZodSchema,
};