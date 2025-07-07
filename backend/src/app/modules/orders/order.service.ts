import { IOrder } from "./order.interface";



import mongoose from "mongoose";

import { OrderModel } from "./order.model";
import ProductModel from "../products/products.model";
import CartModel from "../cart/cart.model";


const createOrderIntoDB = async (payload: IOrder) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    for (const item of payload.items) {
      const product = await ProductModel.findById(item.productId).session(session);

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.stockQuantity < item.quantity) {
        throw new Error(`${product.name} is out of stock`);
      }

      // Reduce stock
      product.stockQuantity -= item.quantity;
      await product.save({ session });
    }

    // Create the order
    const order = await OrderModel.create([payload], { session });

    // Optional: Clear cart after order
    await CartModel.findOneAndUpdate(
      { userId: payload.userId },
      { $set: { items: [] } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return order[0]; // Since `create` with array returns array
  } catch (error:any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(`Order failed: ${error.message}`);
  }
};

const getOrdersByUserFromDB = async (userId: string) => {
  return await OrderModel.find({ userId }).populate("items.productId");
};

const getAllOrdersFromDB = async () => {
  return await OrderModel.find().populate("items.productId");
};

const updateOrderStatusFromDB = async (orderId: string, status: string) => {
  return await OrderModel.findByIdAndUpdate(orderId, { status }, { new: true });
};

export const OrderService = {
  createOrderIntoDB,
  getOrdersByUserFromDB,
  getAllOrdersFromDB,
  updateOrderStatusFromDB
};