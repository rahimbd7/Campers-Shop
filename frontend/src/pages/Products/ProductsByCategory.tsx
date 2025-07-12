import { useParams } from "react-router-dom";
import { useGetProductByCategoryQuery } from "../../redux/features/products/productApi";
import ProductCart from "../../components/ProductCart";
import { useSelector } from "react-redux";
import type { IProduct } from "../../interface/IProduct";
import type { RootState } from "../../redux/store";

const ProductsByCategory = () => {
  const { id } = useParams();
  const { data: category, isLoading } = useGetProductByCategoryQuery(
    id as string
  );
  const productData = useSelector((state: RootState) => state.product.categoryWiseProducts);
console.log("Redux state categoryWiseProducts:", productData);


  if (isLoading || !category) return <div>Loading...</div>;
  return (
    <div>
      {productData?.length > 0 ? (
        productData.map((product) => (
          <ProductCart key={product._id} cartData={product} />
        ))
      ) : (
        <p className="text-center col-span-full">
          No products found in this category.
        </p>
      )}
    </div>
  );
};

export default ProductsByCategory;
