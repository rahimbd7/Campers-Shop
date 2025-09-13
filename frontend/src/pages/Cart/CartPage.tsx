import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useGetAllProductsDetailsOfCartItemsQuery } from "../../redux/features/cart/cartApi";
import { removeFromCart } from "../../redux/features/cart/cartSlice";
import ProductModal from "../../components/ProductCartModal";
import NoDataFound from "../../components/NoDataFound";
import { selectCurrentUser } from "../../redux/features/auth/authSelector";
import type { ICart } from "../../interface/ICart";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const currentUser = useAppSelector(selectCurrentUser);
  const user = currentUser?.user;
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
      navigate("/login", { state: { from: "/checkout" } });
    } else {
      navigate("/checkout");
    }
  };
  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      {(cartItems.length === 0) ? (
       <NoDataFound message="Your cart is empty" />
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
            {productsDetailsOfCartItems.map((item: ICart ) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={item.images[0]||""}
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
                        productId: item._id as string,
                        name: item.name,
                        image: item.images[0] as string,
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
                    onClick={() => dispatch(removeFromCart(item?._id as string))}
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
