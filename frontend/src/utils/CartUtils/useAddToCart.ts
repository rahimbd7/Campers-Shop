import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";


export const useAddToCart = () => {
  const dispatch = useDispatch();

  return (productId: string, quantity = 1) => {
    dispatch(addToCart({ productId, quantity }));
  };
};
