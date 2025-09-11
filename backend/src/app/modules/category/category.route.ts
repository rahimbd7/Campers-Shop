import express, { Request, Response, NextFunction } from 'express'
import { CategoryController } from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidation } from './category.validate';
import { upload } from '../../utils/FileUploader/fileUploadByMulter';
import { validateImageFile } from '../../middlewares/validateImageFile';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/users.constants';

const categoryRouter = express.Router();

categoryRouter.post('/',
    upload.single('icon'),
    (req:Request,res :Response,next :NextFunction)=>{
        if (req.body.data) {
            req.body = JSON.parse(req.body.data);
        }
        next();
    },
     auth(USER_ROLE.admin),
    validateImageFile(2),
    validateRequest(CategoryValidation.createCategoryZodSchema), CategoryController.createCategory);

categoryRouter.get('/', CategoryController.getAllCategory);
categoryRouter.delete('/:id',  auth(USER_ROLE.admin),CategoryController.deleteCategory);



export const CategoryRoutes = categoryRouter
