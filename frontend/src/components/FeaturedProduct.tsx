/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { useGetAllProductsQuery } from "../redux/features/products/productApi";
import ProductCart from "./ProductCart";

const FeaturedProducts: React.FC = () => {
  const { data: products, isLoading, isError } = useGetAllProductsQuery(undefined as any);
  if (isLoading) return <p>Loading featured products...</p>;
  if (isError) return <p>Failed to load products.</p>;

  // Filter products where isFeatured is true
  const featuredProducts = products?.filter(
    (product: any) => product.isFeatured
  );

  if (!featuredProducts || featuredProducts.length === 0) {
    return <p>No featured products available.</p>;
  }
  return (
    <div className="container mx-auto my-8">
     <h1 className="text-[#605DFF] text-2xl font-bold lg:text-3xl text-center  md:py-8 lg:py-10">
       another Featured Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-items-center gap-6 ">
        {featuredProducts.map((product: any) => (
          <ProductCart key={product._id} cartData={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
