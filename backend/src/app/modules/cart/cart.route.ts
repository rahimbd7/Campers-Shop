import express from "express";
import { CartController } from "./cart.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CartValidate } from "./cart.validation";

const cartRouter = express.Router();

cartRouter.get("/get-cart-by-user/:userId", validateRequest(CartValidate.getCartByUser), CartController.getCartByUser);
cartRouter.post("/add-to-cart/:userId", validateRequest(CartValidate.addToCart), CartController.addToCart);
cartRouter.delete("/remove-from-cart/:userId", validateRequest(CartValidate.removeFromCart), CartController.removeFromCart);
cartRouter.post("/merge-cart/:userId", validateRequest(CartValidate.mergeCart), CartController.mergeCart);
cartRouter.delete("/clear-cart/:userId", validateRequest(CartValidate.clearCart), CartController.clearCart);

export const CartRoutes = cartRouter;

