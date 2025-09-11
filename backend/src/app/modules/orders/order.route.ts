import express from "express";
import { OrderController } from "./order.controller";
import validateRequest from "../../middlewares/validateRequest";
import { OrderValidation } from "./order.validate";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/users.constants";



const router = express.Router();

router.post("/create-order", auth(USER_ROLE.admin, USER_ROLE.user), validateRequest(OrderValidation.createOrderZodSchema), OrderController.createOrder);
router.get("/get-user-orders/:userId",  auth(USER_ROLE.admin, USER_ROLE.user), OrderController.getUsersOrder);
router.get("/get-all-orders", auth(USER_ROLE.admin), OrderController.getAllOrders);
router.patch("/update-order-status/:orderId",  auth(USER_ROLE.admin), validateRequest(OrderValidation.updateOrderZodSchema), OrderController.updateOrderStatus);

export const OrderRoutes = router;