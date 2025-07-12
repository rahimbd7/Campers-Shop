import { Schema, model } from 'mongoose';
import { IProduct } from './products.interface';

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  images: [{ type: String }],
  stockQuantity: { type: Number, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  rating: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
},{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });

const ProductModel = model<IProduct>('Product', productSchema);
export default ProductModel;
