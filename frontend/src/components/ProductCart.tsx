import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductModal from "./ProductCartModal";
interface cartData {
  _id: string;
  description: string;
  name: string;
  price: number;
  images: string[];
}
const ProductCart = ({ cartData }: { cartData: cartData }) => {
  const { _id, description, name, price, images = [] } = cartData || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const image = images[0] || "https://via.placeholder.com/150";

  const handleNavigate = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div className="card bg-base-100 w-80 shadow-lg relative hover:shadow-xl transition-all duration-300">
      <figure className="px-10 pt-10">
        <img src={image} alt={name} className="rounded-xl h-40 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center text-lg text-center">{name}</h2>
        <p className="text-sm text-justify">{description?.slice(0, 100)}</p>

        <div className="flex flex-col gap-3 mt-4">
          <p className="font-bold text-xl text-center text-primary">${price}</p>

          <div className="flex justify-between gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-sm btn-primary flex-1"
            >
              Add to Cart
            </button>
            <button
              onClick={handleNavigate}
              className="btn btn-sm btn-outline btn-secondary flex-1"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal
          productId={_id}
          name={name}
          image={image}
          initialQuantity={1}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductCart;
