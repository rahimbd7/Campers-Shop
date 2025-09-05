import { NextFunction, Request, Response } from 'express';
import { CategoryService } from './category.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';


const createCategory =catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const result = await CategoryService.createCategoryIntoDB(req.file,req.body,next);
       if(result) {
           sendResponse(res, {
               statusCode: httpStatus.OK,
               success: true,
               message: 'Category created successfully',
               data: result
           })
       }else{
           throw new Error('Failed to create category')
       }
    });

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryService.getAllCategoryFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category fetched successfully',
        data: result
    })
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryService.deleteCategoryFromDBById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category deleted successfully',
        data: result
    })
})


export const CategoryController = {
    createCategory,
    getAllCategory,
    deleteCategory
};