import { Schema, model } from 'mongoose';
import { ICategory } from './category.interface';


const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  isDeleted: { type: Boolean, default: false },
});

export const CategoryModel = model<ICategory>('Category', categorySchema);