/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../redux/features/user/userApis";
import { useGetAllProductsDetailsOfCartItemsQuery } from "../../redux/features/cart/cartApi";
import { usePlaceOrderMutation } from "../../redux/features/Order/orderApi";

import { toast } from "react-toastify";
import type { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearCart } from "../../redux/features/cart/cartSlice";


const Checkout = () => {
 const backendUser = useAppSelector((state) => state.auth.backendUser);
 const firebaseUser = useAppSelector((state) => state.auth.firebaseUser);
  const user = backendUser || firebaseUser;
  
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();

  const [orderSuccess, setOrderSuccess] = useState(false);
  const {
    data: res,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserByIdQuery(user?.id );
 
  const userData = res?.data || null;

  const [phoneNumber, setPhoneNumber] = useState(userData?.contactNo);

  const [address, setAddress] = useState(userData?.address);

  const cartDataDetails = cartItems || [];
  const { data: { data: cartData } = { data: [] }, isLoading: cartLoading } =
    useGetAllProductsDetailsOfCartItemsQuery(cartDataDetails);

  const [createOrder, { isLoading: isCreating }] = usePlaceOrderMutation();
  const [updateUser] = useUpdateUserMutation();

  const totalAmount = cartData?.reduce(
    (sum: number, item: any) => sum + item.price,
    0
  );

  const handleCheckout = async () => {
    if (!userData) return toast.error("User not loaded");
    

    // Update phone/address before placing order
    const userPayload = {
      
      address,
      contactNo: phoneNumber,
    };
    try {
       await updateUser({id: userData._id, formData:userPayload}).unwrap();
    } catch (err:any) {
      toast.error("Failed to update user info", err);
      return;
    }
    //const prepareCartItemsData for order
    const cartItemsData = cartData.map((item:any) => ({
      productId: item?._id,
      quantity: item?.quantity,
      priceAtOrderTime: item?.price,
    }));
    const orderPayload = {
      userId: userData._id,
      items: cartItemsData,
      totalAmount,
      paymentMethod: "cod",
      deliveryAddress: address,
      contactPhone: phoneNumber,
    };

    try {
      await createOrder(orderPayload).unwrap();
      dispatch(clearCart());
      setOrderSuccess(true);
      toast.success("Order placed successfully!");
    } catch (error) {
      const errMsg = error as { data: { message: string } };
      toast.error(errMsg.data.message);
    }
   
  };

  if (userLoading)
    return <div className="text-center">Loading user data...</div>;
  if (userError || !userData)
    return <div className="text-red-600">Failed to load user.</div>;

  return (
<div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-6 ">
      {/* Customer Info */}
      <div className="bg-base-100 shadow-xl rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold">Customer Information</h2>
        <div className="space-y-2">
          <div>
            <label className="font-semibold">Name:</label>
            <p className="text-sm">{userData.name}</p>
          </div>
          <div>
            <label className="font-semibold">Email:</label>
            <p className="text-sm">{userData?.email}</p>
          </div>
          <div>
            <label className="font-semibold">Phone Number:</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={phoneNumber || userData?.contactNo}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold">Address:</label>
            <textarea
              className="textarea textarea-bordered w-full"
             defaultValue={address || userData?.address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div>
          <p className="font-semibold">Total Amount:</p>
          <p className="text-lg text-success font-bold">${totalAmount}</p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="bg-base-100 shadow-xl rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold">Cart Summary</h2>
        {cartData?.map((item:any) => (
          <div key={item._id} className="border-b py-2">
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm">Price: ${item.price}</p>
          </div>
        ))}

        <button
          onClick={handleCheckout}
          disabled={isCreating}
          className="btn btn-primary w-full mt-4"
        >
          {isCreating ? "Placing Order..." : "Place Order"}
        </button>

        {orderSuccess && (
          <p className="mt-4 text-green-600 font-medium text-center">
            Order placed successfully!
          </p>
        )}
      </div>
    </div>
</div>
  );
};

export default Checkout;
