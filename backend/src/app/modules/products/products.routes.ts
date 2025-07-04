import express from "express";
import { ProductController } from "./products.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./products.validate";


const productRouter = express.Router();

productRouter.post(
  "/create-product",
  validateRequest(ProductValidation.createProductZodSchema),
  ProductController.createProduct
);

productRouter.get("/get-all-products", ProductController.getAllProducts);
productRouter.get("/get-product/:id", ProductController.getProductById);
productRouter.patch(
  "/update-product/:id",
  validateRequest(ProductValidation.updateProductZodSchema),
  ProductController.updateProduct
);
productRouter.delete("/delete-product/:id", ProductController.deleteProduct);

export const ProductRoutes = productRouter;
