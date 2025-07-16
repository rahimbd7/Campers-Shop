/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import ProductCart from "../../components/ProductCart";
import { useGetAllProductsQuery } from "../../redux/features/products/productApi";
import type { RootState } from "../../redux/store";
import type { IProduct } from "../../interface/IProduct";


const AllProducts = () => {
    useGetAllProductsQuery();
    const productData: IProduct[] = useSelector((state: RootState) => state.product.products);
    return (
        <div>
            <h1 className="text-3xl text-center py-8">All Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-items-center ">
                {productData?.map((product) => (
                    <ProductCart key={product._id} cartData={product} />
                ))}
            </div>
        </div>
    );
};

export default AllProducts;

