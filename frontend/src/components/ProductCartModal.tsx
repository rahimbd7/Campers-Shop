// components/ProductModal.tsx
import { useState } from "react";
import { useAddToCart } from "../utils/CartUtils/useAddToCart";
import { toast } from "react-toastify";


interface ProductModalProps {
  productId: string;
  name: string;
  image: string;
  closeModal: () => void;
  initialQuantity?: number;
  isEditMode?: boolean; // ✅ optional
}

const ProductModal: React.FC<ProductModalProps> = ({
  productId,
  name,
  image,
  closeModal,
  initialQuantity,
  isEditMode,
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity || 1);
  const addToCart = useAddToCart();
  const handleAddToCart = () => {
    if (quantity && productId) {
      addToCart(productId, quantity, isEditMode ?? false); // This must call the hook correctly
      toast.success(` ${name} added to cart`);
    }
    closeModal();
  };

  return (
    <div className="modal modal-open" role="dialog">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{name}</h3>
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover my-4 rounded"
        />
        <p className="text-md ">Quantity </p>
        <div className="flex items-center justify-center gap-4 py-4">
          <button
            className="btn"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            -
          </button>
          <span className="text-xl font-bold">{quantity}</span>
          <button className="btn" onClick={() => setQuantity((q) => q + 1)}>
            +
          </button>
        </div>
        <div className="modal-action">
          <button className="btn btn-outline" onClick={closeModal}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={() => handleAddToCart()}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
