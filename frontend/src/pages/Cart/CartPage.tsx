import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import type { RootState } from "../../redux/store";
import { useGetAllProductsDetailsOfCartItemsQuery } from "../../redux/features/cart/cartApi";
import { removeFromCart } from "../../redux/features/cart/cartSlice";
import ProductModal from "../../components/ProductCartModal";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const { data: responseData } = useGetAllProductsDetailsOfCartItemsQuery(cartItems);
  const productsDetailsOfCartItems = responseData?.data || [];

  const [editingItem, setEditingItem] = useState<null | {
    productId: string;
    name: string;
    image: string;
    initialQuantity?: number;
  }>(null);



  const handleCheckout = () => {
    if (!user) {
      navigate("/login?redirect=cart");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      {(cartItems.length === 0) ? (
        <p>No items in cart</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productsDetailsOfCartItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td>{item.name}</td>
                <td className="flex items-center gap-2">
                  {item.quantity}
                  <button
                    className="btn btn-xs"
                    onClick={() =>
                      setEditingItem({
                        productId: item._id,
                        name: item.name,
                        image: item.image,
                        initialQuantity: item.quantity,
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>${Number(item.price).toFixed(2)}</td>
                <td>${(Number(item.price) * Number(item.quantity)).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => dispatch(removeFromCart(item?._id))}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {cartItems.length > 0 && (
        <div className="mt-6 text-right">
          <button className="btn btn-primary" onClick={handleCheckout}>
            {user ? "Proceed to Checkout" : "Login to Checkout"}
          </button>
        </div>
      )}

      {/* Modal render */}
      {editingItem && (
        <ProductModal
          productId={editingItem.productId}
          name={editingItem.name}
          image={editingItem.image}
          initialQuantity={editingItem.initialQuantity}
          isEditMode={true}
          closeModal={() => setEditingItem(null)}
        />
      )}
    </div>
  );
};

export default CartPage;
