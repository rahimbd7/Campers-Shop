
export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stockQuantity: number;
  categoryId: string;
  rating?: number;
  isFeatured?: boolean;
  isDeleted?: boolean;
}