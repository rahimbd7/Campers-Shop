/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import ProductCart from "./ProductCart";
import { useGetAllProductsQuery } from "../redux/features/products/productApi";

interface ProductsSectionProps {
  title: string;
  filterKey: string;
  headingColor?: string;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ title, filterKey, headingColor }) => {
  const { data: products, isLoading, isError } = useGetAllProductsQuery(undefined);

  if (isLoading) return <p>Loading {title.toLowerCase()}...</p>;
  if (isError) return <p>Failed to load products.</p>;

  // Dynamically filter based on the passed filterKey
  const filteredProducts = products?.data?.filter((product: any) => product[filterKey]);

  if (!filteredProducts || filteredProducts.length === 0) {
    return <p>No {title.toLowerCase()} available.</p>;
  }

  return (
    <div className="container mx-auto my-8">
      <h1
        className={`text-2xl font-bold lg:text-3xl text-center md:py-8 lg:py-10`}
        style={{ color: headingColor || "#333" }}
      >
        {title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6">
        {filteredProducts.map((product: any) => (
          <ProductCart key={product._id} cartData={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;
