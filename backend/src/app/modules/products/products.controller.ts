// import { Request, Response } from 'express';
// import { ProductService } from './products.service';
// import catchAsync from '../../../shared/catchAsync';
// import sendResponse from '../../../shared/sendResponse';
// import httpStatus from 'http-status';

// const createProduct = catchAsync(async (req: Request, res: Response) => {
//     const payload = req.body;
//     const files = req.files as Express.Multer.File[];
//     const result = await ProductService.createProductIntoDB(payload, files);
//     if (result) {
//         sendResponse(res, {
//             statusCode: httpStatus.OK,
//             success: true,
//             message: 'Product created successfully',
//             data: result
//         });
//     } else {
//         throw new Error('Failed to create product');
//     }
// });

// const getAllProducts = catchAsync(async (req: Request, res: Response) => {
//     const result = await ProductService.getAllProductsFromDB(req.query);

//     if(result.length === 0) {
//         return sendResponse(res, {
//             statusCode: httpStatus.OK,
//             success: true,
//             message: 'Products DB is empty!',
//             data: result
//         });
//     }
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Products fetched successfully',
//         data: result
//     });
// });

// const getProductById = catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result = await ProductService.getProductByIdFromDB(id);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Product fetched successfully',
//         data: result
//     });
// });

// const updateProduct = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const payload = req.body;
//   const files = req.files as Express.Multer.File[];

//   const result = await ProductService.updateProductIntoDB(id, payload, files);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Product updated successfully",
//     data: result,
//   });
// });

// const deleteProduct = catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result = await ProductService.deleteProductByIdFromDB(id);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Product deleted successfully',
//         data: result
//     });
// });

// const getProductByCategory = catchAsync(async (req: Request, res: Response) => {
//     const { categoryId } = req.params;
//     const result = await ProductService.getProductByCategoryIdFromDB(categoryId);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Product fetched successfully',
//         data: result
//     });
// })
// export const ProductController = {
//     createProduct,
//     getAllProducts,
//     getProductById,
//     updateProduct,
//     deleteProduct,
//     getProductByCategory
// };



import { Request, Response } from "express";
import { ProductService } from "./products.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const files = req.files as Express.Multer.File[];

  // Direct Cloudinary Upload handled inside the service
  const result = await ProductService.createProductIntoDB(payload, files);

  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } else {
    throw new Error("Failed to create product");
  }
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getAllProductsFromDB(req.query);

  if (result.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Products DB is empty!",
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products fetched successfully",
    data: result,
  });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.getProductByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product fetched successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const files = req.files as Express.Multer.File[];

  // Direct Cloudinary Upload handled inside the service
  const result = await ProductService.updateProductIntoDB(id, payload, files);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductService.deleteProductByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

const getProductByCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const result = await ProductService.getProductByCategoryIdFromDB(categoryId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product fetched successfully",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByCategory,
};
