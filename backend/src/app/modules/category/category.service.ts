import { ICategory } from "./category.interface";
import { CategoryModel } from "./category.model";


const createCategoryIntoDB = async (payload: ICategory) => {
    return await CategoryModel.create(payload);
};

const getAllCategoryFromDB = async () => {
    return await CategoryModel.find();
};

const deleteCategoryFromDBById = async (id: string) => {
    return await CategoryModel.findByIdAndUpdate(id,{ isDeleted: true }, { new: true });
}

export const CategoryService = {
    createCategoryIntoDB,
    getAllCategoryFromDB,
    deleteCategoryFromDBById
};