import { Types } from 'mongoose';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  images: string[];
  stockQuantity: number;
  categoryId: Types.ObjectId;
  rating?: number;
  isFeatured?: boolean;
  isDeleted?: boolean;
  isBestSelling?: boolean;
}
