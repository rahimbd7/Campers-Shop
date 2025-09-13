import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/features/products/productApi";
import { useAddToCart } from "../../utils/CartUtils/useAddToCart";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
interface Product {
  name: string;
  images: string[];
  description: string;
  price: number;
}

const ProductDetails = () => {
  const { productId } = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(productId as string);
  const singleProduct = useMemo<Product>(() => product||({} as Product), [product]);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  const addToCart = useAddToCart();

  const handleAddToCart = () => {
    addToCart(productId as string, quantity);
    toast.success(` ${singleProduct?.name} added to cart`);
  };

  // Reset main image when product changes
  useEffect(() => {
    if (singleProduct?.images?.length > 0) {
      setSelectedImage(singleProduct.images[0]);
    }
  }, [singleProduct]);

  if (isLoading || !product) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Gallery */}
        <div className="flex-1">
          {/* Fixed-size main image box */}
          <div className="border rounded-lg overflow-hidden bg-white flex items-center justify-center h-[450px] w-full">
            <img
              src={selectedImage}
              alt={singleProduct?.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Fixed-size Thumbnails */}
          <div className="flex gap-3 mt-4 flex-wrap">
            {singleProduct?.images?.map((img: string, idx: number) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(img)}
                style={{
                  backgroundImage: `url(${img})`,
                }}
                className={`h-16 w-16 bg-center bg-contain bg-no-repeat rounded-md border cursor-pointer transition-all duration-200
                  ${
                    selectedImage === img
                      ? "border-2 border-blue-500 scale-105"
                      : "border border-gray-300"
                  }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {singleProduct?.name}
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base md:text-lg">
            {singleProduct?.description}
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold mt-4">
            ${singleProduct?.price}
          </p>

          {/* Quantity */}
          <div className="flex gap-3 mt-6 items-center">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="btn btn-outline"
            >
              -
            </button>
            <span className="text-lg sm:text-xl md:text-2xl font-bold">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="btn btn-outline"
            >
              +
            </button>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="btn btn-primary mt-6 w-full sm:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
