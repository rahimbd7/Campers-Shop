import express from 'express'
import { CategoryController } from './category.controller';

const categoryRouter = express.Router();

categoryRouter.post('/', CategoryController.createCategory);
categoryRouter.get('/', CategoryController.getAllCategory);
categoryRouter.delete('/:id', CategoryController.deleteCategory);



export const CategoryRoutes = categoryRouter
