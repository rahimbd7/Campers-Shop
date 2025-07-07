import { z } from "zod";


const orderItemZodSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  priceAtOrderTime: z.number().nonnegative("Price must be 0 or greater"),
});


export const createOrderZodSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  items: z.array(orderItemZodSchema).min(1, "At least one item is required"),
  totalAmount: z.number().positive("Total amount must be greater than 0"),
  paymentMethod: z.enum(["cod", "stripe"]),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  contactPhone: z.string().min(10, "Valid phone number is required"),
  status: z
    .enum(["pending", "confirmed", "shipped", "delivered"])
    .optional(),
});



export const updateOrderZodSchema = z.object({
  userId: z.string().optional(),
  items: z
    .array(orderItemZodSchema)
    .min(1, "At least one item is required")
    .optional(),
  totalAmount: z.number().positive("Total amount must be greater than 0").optional(),
  paymentMethod: z.enum(["cod", "stripe"]).optional(),
  deliveryAddress: z.string().optional(),
  contactPhone: z.string().min(10, "Valid phone number is required").optional(),
  status: z.enum(["pending", "confirmed", "shipped", "delivered"]).optional(),
});

export const OrderValidation = {
  createOrderZodSchema,
  updateOrderZodSchema,
};
