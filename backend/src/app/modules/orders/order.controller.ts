import { Request, Response } from "express";
import { OrderService } from "./order.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from 'http-status'


const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await OrderService.createOrderIntoDB(req.body);
  if (order) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order created successfully',
      data: order
    })
  } else {
    throw new Error('Failed to create order')
  }
});

const getUsersOrder = catchAsync(async (req: Request, res: Response) => {
  const orders = await OrderService.getOrdersByUserFromDB(req.params.userId);
  if (orders.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Orders DB is empty!',
      data: orders
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully',
    data: orders
  })
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const orders = await OrderService.getAllOrdersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully',
    data: orders
  })
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const {status} = req.body?.body;
  const result = await OrderService.updateOrderStatusFromDB(orderId, status);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order updated successfully',
    data: result
  })
});

export const OrderController = {
  createOrder,
  getUsersOrder,
  getAllOrders,
  updateOrderStatus,
};
