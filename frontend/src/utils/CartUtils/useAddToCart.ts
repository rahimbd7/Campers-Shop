import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { RootState } from "../../redux/store";
import { addToCart, updateQuantity } from "../../redux/features/cart/cartSlice";

export const useAddToCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);

  return (productId: string, quantity: number = 1, isEditMode: boolean = false) => {
    if (!productId) return;

    const existingItem = cartItems.find(item => item.productId === productId);

    if (existingItem) {
      if (isEditMode) {
        // 🔄 Edit mode → replace quantity
        dispatch(updateQuantity({ productId, quantity }));
      } else {
        // ➕ Add mode → increase quantity
        const newQuantity = existingItem.quantity + quantity;
        dispatch(updateQuantity({ productId, quantity: newQuantity }));
      }
    } else {
      // 🆕 New item in cart
      dispatch(addToCart({ productId, quantity }));
    }
  };
};
