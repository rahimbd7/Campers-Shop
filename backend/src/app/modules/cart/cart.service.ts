

// export const OrderService = {
//   async createOrder(payload: IOrder) {
//     return OrderModel.create(payload);
//   },

import { Types } from "mongoose";
import { ICartItem } from "./cart.interface";
import CartModel from "./cart.model";

const getCartByUserFromDB = async (userId: string) => {
    return await CartModel.findOne({ userId }).populate("items.productId");
};

const addToCart = async (userId: Types.ObjectId, productId: Types.ObjectId, quantity: number) => {
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return CartModel.create({ userId, items: [{ productId, quantity }] });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.equals(productId));
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({productId: productId,  quantity });
    }

    return cart.save();
};

const removeFromCart = async (userId: Types.ObjectId, productId: Types.ObjectId) => {
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return null;
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.equals(productId));
    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
    }

    return cart.save();
};

const mergeCart = async (
  userId: Types.ObjectId,
  guestItems: ICartItem[]
) => {
  let cart = await CartModel.findOne({ userId });

  if (!cart) {
    // Create new cart if none exists
    cart = new CartModel({ userId, items: guestItems });
    return await cart.save();
  }

  for (const guestItem of guestItems) {
    const existingIndex = cart.items.findIndex((item) =>
      item.productId.equals(guestItem.productId)
    );

    if (existingIndex > -1) {
      // If product already in cart, increase quantity
      cart.items[existingIndex].quantity += guestItem.quantity;
    } else {
      // Else, add as new item
      cart.items.push(guestItem);
    }
  }

  return await cart.save();
};



const clearCart = async (userId: Types.ObjectId) => {
    return await CartModel.findOneAndDelete({ userId });
}
export const CartService = {
    getCartByUserFromDB,
    addToCart,
    removeFromCart,
    mergeCart,
    clearCart
}
