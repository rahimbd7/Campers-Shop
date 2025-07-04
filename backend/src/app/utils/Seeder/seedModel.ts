import mongoose from "mongoose";
import ProductModel from '../../modules/products/products.model';
import { CategoryModel } from '../../modules/category/category.model';
import UserModel from '../../modules/users/users.model';
const modelMap: { [key: string]: mongoose.Model<any> } = {
  product: ProductModel,
  category: CategoryModel,
  user: UserModel,
};
export default modelMap;