import ProductModel from './products.model';
import { IProduct } from './products.interface';
import uploadImageToCloudinary, { deleteImageFromCloudinary } from '../../utils/FileUploader/uploadImageToCloudinary';

const createProductIntoDB = async (
  payload: Omit<IProduct, "images">,
  files: Express.Multer.File[]
) => {
  let imageUrls: string[] = [];

  // Handle image upload if files exist
  if (files && files.length > 0) {
    const uploadPromises = files.map(async (file) => {
      const filename = `${Date.now()}-${file.originalname}`;
      const { secure_url } = (await uploadImageToCloudinary(filename, file.path)) as {
        secure_url: string;
      };
      return secure_url;
    });

    imageUrls = await Promise.all(uploadPromises);
  }

  //  Merge payload with uploaded image URLs
  const productData = {
    ...payload,
    images: imageUrls,
  };

  const createdProduct = await ProductModel.create(productData);
  return createdProduct;
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

  return await ProductModel.find(query)
  .populate("categoryId", "name")
  .sort(sortCondition);
};


 const getProductByIdFromDB = async (id: string) => {
  return await ProductModel.findById(id);
};

const updateProductIntoDB = async (
  id: string,
  payload: Partial<IProduct> & { removedOldImages?: string[] },
  files: Express.Multer.File[]
) => {
  const product = await ProductModel.findById(id);
  if (!product) {
    throw new Error("Product not found");
  }

  // ✅ Remove old images if requested
  if (payload.removedOldImages && payload.removedOldImages.length > 0) {
    for (const imgUrl of payload.removedOldImages) {
      await deleteImageFromCloudinary(imgUrl);
    }
    product.images = product.images.filter(
      (img) => !payload.removedOldImages?.includes(img)
    );
  }

  // ✅ Upload new images
  if (files && files.length > 0) {
    const uploadPromises = files.map(async (file) => {
      const filename = `${Date.now()}-${file.originalname}`;
      const { secure_url } = await uploadImageToCloudinary(filename, file.path);
      return secure_url;
    });

    const newImageUrls: string[] = await Promise.all(uploadPromises) as string[];
    product.images.push(...newImageUrls);
  }

  // ✅ Extract categoryId._id if sent as object
  if (payload.categoryId && typeof payload.categoryId === "object" && "_id" in payload.categoryId) {
    payload.categoryId = payload.categoryId._id;
  }

  // ✅ Update other fields (except removedOldImages)
  const { removedOldImages, ...restPayload } = payload;
  Object.assign(product, restPayload);

  await product.save();
  return product;
};


 const deleteProductByIdFromDB = async (id: string) => {
  return await ProductModel.findByIdAndUpdate(id,{ isDeleted: true });
};

const getProductByCategoryIdFromDB = async (categoryId: string) => {
  return await ProductModel.find({ categoryId, isDeleted: false }).populate('categoryId');
};


export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductIntoDB,
  deleteProductByIdFromDB,
  getProductByCategoryIdFromDB
};
