import { Types } from "mongoose";

export interface IOrderItem {
  productId: Types.ObjectId;
  quantity: number;
  priceAtOrderTime: number;
}

export interface IOrder {
  userId: Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  paymentMethod: "bkash" | "stripe";
  deliveryAddress: string;
  contactPhone: string;
  status?: "pending" | "confirmed" | "shipped" | "delivered";
}
