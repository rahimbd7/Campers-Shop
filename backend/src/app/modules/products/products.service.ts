import ProductModel from './products.model';
import { IProduct } from './products.interface';

 const createProductIntoDB = async (payload: IProduct) => {
  return await ProductModel.create(payload);
};

const getAllProductsFromDB = async (filters: any) => {
  const {
    search,
    categoryId,
    minPrice,
    maxPrice,
    sortBy = "name",     // default sort field
    sortOrder = "asc",   // default sort direction
  } = filters;

  const query: any = {
    isDeleted: false, // only return non-deleted products
  };


  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }


  if (categoryId) {
    query.categoryId = categoryId;
  }


  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }


  const sortCondition: Record<string, 1 | -1> = {};
  if (sortBy) {
    sortCondition[sortBy] = sortOrder === "desc" ? -1 : 1;
  }

  return await ProductModel.find(query).sort(sortCondition);
};


 const getProductByIdFromDB = async (id: string) => {
  return await ProductModel.findById(id);
};

 const updateProductIntoDB = async (id: string, payload: Partial<IProduct>) => {
  return await ProductModel.findByIdAndUpdate(id, payload, { new: true });
};

 const deleteProductByIdFromDB = async (id: string) => {
  return await ProductModel.findByIdAndUpdate(id,{ isDeleted: true });
};

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductIntoDB,
  deleteProductByIdFromDB
};
