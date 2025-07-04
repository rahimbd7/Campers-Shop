import express from 'express'
import { CategoryController } from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validate';

const categoryRouter = express.Router();

categoryRouter.post('/',validateRequest(CategoryValidation.createCategoryZodSchema), CategoryController.createCategory);

categoryRouter.get('/', CategoryController.getAllCategory);
categoryRouter.delete('/:id', CategoryController.deleteCategory);



export const CategoryRoutes = categoryRouter
