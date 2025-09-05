import { useLocation, useParams } from "react-router-dom";
import { useGetProductByCategoryQuery } from "../../redux/features/products/productApi";
import ProductCart from "../../components/ProductCart";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import NoDataFound from "../../components/NoDataFound";
import LoadingSpinner from "../../components/LoadingSpinner";

const ProductsByCategory = () => {
  const { id } = useParams();
  const location = useLocation();
  const name = location.state?.name;

  const { data: category, isLoading } = useGetProductByCategoryQuery(
    id as string,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const productData = useSelector(
    (state: RootState) => state.product.categoryWiseProducts
  );
  if (isLoading || !category) return <LoadingSpinner message="Products loading..." />;
  return (
    <div>
      <h1 className="text-3xl text-center py-8">
        Products in <span className="text-[#605DFF]">{name}</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-items-center ">
        {productData?.length > 0 ? (
          productData.map((product) => (
            <ProductCart key={product._id} cartData={product} />
          ))
        ) : (
          <p className="text-center col-span-full">
           <NoDataFound message="No products found in this category" />
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsByCategory;
