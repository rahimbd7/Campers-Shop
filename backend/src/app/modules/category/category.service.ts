// import { NextFunction } from "express";
// import uploadImageToCloudinary from "../../utils/FileUploader/uploadImageToCloudinary";
// import { ICategory } from "./category.interface";
// import { CategoryModel } from "./category.model";


//     const createCategoryIntoDB = async (file:any, payload: ICategory,next : NextFunction) => {
      
//         if(file  && file?.path){
//             const filename =  `${payload?.name}`; 
//             const {secure_url} = await uploadImageToCloudinary(filename, file.path);
//             payload.icon = secure_url as string;
//         }
//         return await CategoryModel.create(payload);
//     };

// const getAllCategoryFromDB = async () => {
//     return await CategoryModel.find({ isDeleted: false });
// };

// const deleteCategoryFromDBById = async (id: string) => {
//     return await CategoryModel.findByIdAndUpdate(id,{ isDeleted: true }, { new: true });
// }

// export const CategoryService = {
//     createCategoryIntoDB,
//     getAllCategoryFromDB,
//     deleteCategoryFromDBById
// };





import { NextFunction } from "express";
import { ICategory } from "./category.interface";
import { CategoryModel } from "./category.model";
import uploadBufferToCloudinary, { deleteImageFromCloudinary } from "../../utils/FileUploader/cloudinaryDirectFileUpload";

const CLOUD_FOLDER = "categories"; // Cloudinary folder for category icons

// CREATE Category
const createCategoryIntoDB = async (file: any, payload: ICategory, next: NextFunction) => {
    if (file && file.buffer) {
        const filename = `${payload.name}-${Date.now()}`;
        const { secure_url } = await uploadBufferToCloudinary(file.buffer, filename, CLOUD_FOLDER);
        payload.icon = secure_url as string;
    }
    return await CategoryModel.create(payload);
};

// GET all categories
const getAllCategoryFromDB = async () => {
    return await CategoryModel.find({ isDeleted: false });
};

// DELETE Category by ID
const deleteCategoryFromDBById = async (id: string) => {
    const category = await CategoryModel.findById(id);
    if (!category) throw new Error("Category not found");

    // Delete icon from Cloudinary if exists
    if (category.icon) {
        await deleteImageFromCloudinary(category.icon);
    }

    category.isDeleted = true;
    await category.save();
    return category;
};

export const CategoryService = {
    createCategoryIntoDB,
    getAllCategoryFromDB,
    deleteCategoryFromDBById
};
