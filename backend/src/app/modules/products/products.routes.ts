import express, { Request, Response, NextFunction } from "express";
import { ProductController } from "./products.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./products.validate";
import { upload } from "../../utils/FileUploader/fileUploadByMulter";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/users.constants";


const productRouter = express.Router();

productRouter.post(
  "/create-product",upload.array("images"),(req:Request,res:Response,next:NextFunction)=>{
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    } 
    next();
  },
  validateRequest(ProductValidation.createProductZodSchema),
  ProductController.createProduct
);

productRouter.get("/get-all-products", ProductController.getAllProducts);
productRouter.get("/category/:categoryId", ProductController.getProductByCategory);
productRouter.get("/get-product/:id", ProductController.getProductById);
productRouter.patch(
  "/update-product/:id",
  upload.array("images"),
  (req:Request,res:Response,next:NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  auth(USER_ROLE.admin),
  validateRequest(ProductValidation.updateProductZodSchema),
  ProductController.updateProduct
);
productRouter.delete("/delete-product/:id", auth(USER_ROLE.admin), ProductController.deleteProduct);

export const ProductRoutes = productRouter;
