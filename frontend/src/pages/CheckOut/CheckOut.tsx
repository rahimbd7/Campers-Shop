/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../redux/features/user/userApis";
import { useGetAllProductsDetailsOfCartItemsQuery } from "../../redux/features/cart/cartApi";
import { usePlaceOrderMutation } from "../../redux/features/Order/orderApi";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearCart } from "../../redux/features/cart/cartSlice";
import PaymentPopup from "../../components/PaymentPopup";
import type { RootState } from "../../redux/store";

const Checkout = () => {
  const backendUser = useAppSelector((state) => state.auth.backendUser);
  const firebaseUser = useAppSelector((state) => state.auth.firebaseUser);
  const user = backendUser || firebaseUser;

  const { cartItems } = useSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [paymentPopup, setPaymentPopup] = useState(false);

  const { data: res, isLoading: userLoading, isError: userError } = useGetUserByIdQuery(user?.id);
  const userData = res?.data || null;

  const [phoneNumber, setPhoneNumber] = useState(userData?.contactNo);
  const [address, setAddress] = useState(userData?.address);

  const cartDataDetails = cartItems || [];
  const { data: { data: cartData } = { data: [] } } =
    useGetAllProductsDetailsOfCartItemsQuery(cartDataDetails);

  const [createOrder, { isLoading: isCreating }] = usePlaceOrderMutation();
  const [updateUser] = useUpdateUserMutation();

  const totalAmount = cartData?.reduce((sum: number, item: any) => sum + item.price, 0);

  const handleConfirmPayment = async (method: string, clientSecret?: string) => {
    if (!userData) return toast.error("User not loaded");

    try {
      // 1️⃣ Update user with latest address & phone
      await updateUser({ id: userData._id, formData: { address, contactNo: phoneNumber } }).unwrap();

      // 2️⃣ Prepare cart items
      const cartItemsData = cartData.map((item: any) => ({
        productId: item?._id,
        quantity: item?.quantity,
        priceAtOrderTime: item?.price,
      }));

      // 3️⃣ Create order with stripePaymentIntentId if present
      await createOrder({
        userId: userData._id,
        items: cartItemsData,
        totalAmount,
        paymentMethod: method,
        deliveryAddress: address,
        contactPhone: phoneNumber,
        stripePaymentIntentId: clientSecret, // store in DB
      }).unwrap();

      dispatch(clearCart());
      setOrderSuccess(true);
      toast.success("Order placed successfully!");
      setPaymentPopup(false);
    } catch (error: any) {
      console.log(error?.data?.message);
      toast.error(error?.data?.message || "Order failed");
    }
  };

  if (userLoading) return <div className="text-center">Loading user data...</div>;
  if (userError || !userData) return <div className="text-red-600">Failed to load user.</div>;

  return (
    <div className="min-h-screen">
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
          {cartData?.map((item: any) => (
            <div key={item._id} className="border-b py-2">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm">Price: ${item.price}</p>
            </div>
          ))}

          <button
            onClick={() => setPaymentPopup(true)}
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

      {paymentPopup && (
        <PaymentPopup
          onClose={() => setPaymentPopup(false)}
          onSuccess={handleConfirmPayment}
          amount={totalAmount}
        />
      )}
    </div>
  );
};

export default Checkout;
