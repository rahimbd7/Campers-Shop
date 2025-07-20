import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../../redux/features/user/userApis";
import { useGetAllProductsDetailsOfCartItemsQuery } from "../../redux/features/cart/cartApi";
import { useCreateOrderMutation } from "../../redux/features/Order/orderApi";

import { toast, ToastContainer } from "react-toastify";
import type { RootState } from "../../redux/store";

const Checkout = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const [orderSuccess, setOrderSuccess] = useState(false);
  const { data: res, isLoading: userLoading, isError: userError } = useGetUserByIdQuery(user?.id);
  const userData = res?.data || null;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const cartDataDetails = cartItems || [];
  const {
    data: { data: cartData } = { data: [] },
    isLoading: cartLoading,
  } = useGetAllProductsDetailsOfCartItemsQuery(cartDataDetails);

  const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation();
  const [updateUser] = useUpdateUserMutation();

  const totalAmount = cartData?.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (!userData) return toast.error("User not loaded");

    // Update phone/address before placing order
    try {
      await updateUser({ id: userData._id, data: { address, phoneNumber } }).unwrap();
    } catch (err) {
      toast.error("Failed to update user info");
      return;
    }

    const orderPayload = {
      userId: userData._id,
      userEmail: user?.email,
      fullName: userData?.name,
      address,
      phoneNumber,
      items: cartData,
      totalAmount,
    };

    try {
      await createOrder(orderPayload).unwrap();
      setOrderSuccess(true);
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  if (userLoading) return <div className="text-center">Loading user data...</div>;
  if (userError || !userData) return <div className="text-red-600">Failed to load user.</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-6">
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
            <p className="text-sm">{user?.email}</p>
          </div>
          <div>
            <label className="font-semibold">Phone Number:</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={phoneNumber || userData.phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold">Address:</label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={address || userData.address}
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
        {cartData?.map((item) => (
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
            🎉 Order placed successfully!
          </p>
        )}
      </div>
      
    </div>
  );
};

export default Checkout;
