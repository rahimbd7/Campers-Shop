
import type { RootState } from "../../redux/store";
import { addToCart, updateQuantity } from "../../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export const useAddToCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);

  return (productId: string, quantity: number = 1) => {
    if (!productId) return;

    const existingItem = cartItems.find(item => item.productId === productId);

    if (existingItem) {
      // For update mode
      dispatch(updateQuantity({ productId, quantity }));
    } else {
      // For add mode
      dispatch(addToCart({ productId, quantity }));
    }
  };
};
