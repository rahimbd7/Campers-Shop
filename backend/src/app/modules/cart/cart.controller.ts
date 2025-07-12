import { Request, Response } from "express";

import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { Types } from "mongoose";
import { CartService } from "./cart.service";

const getCartByUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const result = await CartService.getCartByUserFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart fetched successfully",
    data: result,
  });
});

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.params.userId);
  const { productId, quantity } = req.body;
  const result = await CartService.addToCart(userId, productId, quantity);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Item added to cart successfully",
    data: result,
  });
});

const removeFromCart = catchAsync(async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.params.userId);
  const { productId } = req.body;
  const result = await CartService.removeFromCart(userId, productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Item removed from cart successfully",
    data: result,
  });
});

const mergeCart = catchAsync(async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.params.userId);
  const guestItems = req.body;
  const result = await CartService.mergeCart(userId, guestItems);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart merged successfully",
    data: result,
  });
});

const clearCart = catchAsync(async (req: Request, res: Response) => {
  const userId = new Types.ObjectId(req.params.userId);
  const result = await CartService.clearCart(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart cleared successfully",
    data: result,
  });
});

const getProductDetailsFromCart= catchAsync(async (req: Request, res: Response) => {
  const result = await CartService.getProductDetailsOfCartItems(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product details fetched successfully",
    data: result,
  });
})

export const CartController = {
  getCartByUser,
  addToCart,
  removeFromCart,
  mergeCart,
  clearCart,
  getProductDetailsFromCart
};
