import express from "express";
import { OrderController } from "./order.controller";
import validateRequest from "../../middlewares/validateRequest";
import { OrderValidation } from "./order.validate";



const router = express.Router();

router.post("/create-order", validateRequest(OrderValidation.createOrderZodSchema), OrderController.createOrder);
router.get("/get-users-order/:userId", OrderController.getUsersOrder);
router.get("/get-all-orders", OrderController.getAllOrders);
router.patch("/update-order-status/:orderId", validateRequest(OrderValidation.updateOrderZodSchema), OrderController.updateOrderStatus);

export const OrderRoutes = router;