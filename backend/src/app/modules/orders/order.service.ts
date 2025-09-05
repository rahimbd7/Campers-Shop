import { IOrder } from "./order.interface";



import mongoose from "mongoose";

import { OrderModel } from "./order.model";
import ProductModel from "../products/products.model";
import CartModel from "../cart/cart.model";


const createOrderIntoDB = async (payload: IOrder) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let totalAmount = 0;

    for (const item of payload.items) {
      const product = await ProductModel.findById(item.productId).session(session);

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      if (product.stockQuantity < item.quantity) {
        throw new Error(`${product.name} is out of stock`);
      }

      // Calculate totalAmount using latest DB price
      totalAmount += product.price * item.quantity;

      //  Deduct stock
      product.stockQuantity -= item.quantity;
      await product.save({ session });
    }

    //  Set calculated total amount instead of trusting client data
    payload.totalAmount = parseFloat(totalAmount.toFixed(2));

    //  Create order
    const order = await OrderModel.create([payload], { session });

    await session.commitTransaction();
    session.endSession();

    return order[0];
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(`Order failed: ${error.message}`);
  }
};


const getOrdersByUserFromDB = async (userId: string) => {
  return await OrderModel.find({ userId }).populate("items.productId");
};

const getAllOrdersFromDB = async () => {
  return await OrderModel.find()
  .populate("items.productId", "name price")
  .populate("userId", "name email");
};

const updateOrderStatusFromDB = async (orderId: string, status: string) => {
  const result = await OrderModel.findByIdAndUpdate(orderId, { status }, { new: true });
  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getOrdersByUserFromDB,
  getAllOrdersFromDB,
  updateOrderStatusFromDB
};