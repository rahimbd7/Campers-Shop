import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/features/products/productApi";

import type { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { useAddToCart } from "../../utils/CartUtils/useAddToCart";
import { useState } from "react";


const ProductDetails = () => {
  const { productId } = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(productId as string);

  const singleProduct = useAppSelector((state: RootState) => state.product.productById);
console.log(singleProduct);

const [quantity, setQuantity] = useState(1);

const addToCart = useAddToCart();
const handleAddToCart = () => {
  // dispatch(addToCart({ productId, quantity }));
  addToCart(productId as string, quantity);
};

  if (isLoading || !product) return <div>Loading...</div>;
  

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image gallery */}
        <div className="flex-1">
          <img src={singleProduct?.images[0]} className="rounded-lg w-full" alt={singleProduct?.name} />
          <div className="flex gap-2 mt-2">
            {singleProduct?.images.map((img, idx) => (
              <img key={idx} src={img} className="h-16 w-16 object-cover rounded-md border" />
            ))}
          </div>
        </div>

        {/* singleProduct Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{singleProduct?.name}</h1>
          <p className="text-gray-600">{singleProduct?.description}</p>
          <p className="text-2xl font-semibold mt-4">${singleProduct?.price}</p>

          {/* Quantity and Add to Cart */}
          <div className="flex gap-2 mt-4 items-center">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="btn btn-outline">-</button>
            <span className="text-xl font-bold">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="btn btn-outline">+</button>
          </div>

          <button onClick={handleAddToCart} className="btn btn-primary mt-4">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
