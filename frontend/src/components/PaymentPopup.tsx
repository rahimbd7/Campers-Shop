import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCreateStripePaymentMutation } from "../redux/features/payment/paymentApi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY as string);

interface PaymentPopupProps {
  onClose: () => void;
  onSuccess: (method: string, clientSecret?: string) => void;
  amount: number;
}

const StripePaymentForm = ({
  amount,
  onSuccess,
}: {
  amount: number;
  onSuccess: (method: string, clientSecret?: string) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent] = useCreateStripePaymentMutation();
  const [loading, setLoading] = useState(false);

  const handleStripePayment = async () => {
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      // 1️⃣ Create Payment Intent
      const { clientSecret } = await createPaymentIntent({ amount, currency: "usd" }).unwrap();

      // 2️⃣ Confirm Payment with Stripe
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      // 3️⃣ If successful, send back clientSecret
      if (paymentIntent?.status === "succeeded") {
        alert("Payment successful!");
        onSuccess("stripe", clientSecret);
      }
    } catch (err) {
      console.error("Payment error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <CardElement className="p-2 border rounded-md" />
      <button
        onClick={handleStripePayment}
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay with Stripe"}
      </button>
    </div>
  );
};

const PaymentPopup = ({ onClose, onSuccess, amount }: PaymentPopupProps) => {
  const [selectedMethod, setSelectedMethod] = useState("cod");

  const handleConfirm = () => {
    if (selectedMethod === "cod") {
      onSuccess("cod", undefined); // COD has no clientSecret
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Choose Payment Method</h2>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={selectedMethod === "cod"}
              onChange={() => setSelectedMethod("cod")}
            />
            <span>Cash on Delivery (COD)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              value="stripe"
              checked={selectedMethod === "stripe"}
              onChange={() => setSelectedMethod("stripe")}
            />
            <span>Stripe Payment</span>
          </label>
        </div>

        {selectedMethod === "stripe" && (
          <Elements stripe={stripePromise}>
            <StripePaymentForm amount={amount} onSuccess={onSuccess} />
          </Elements>
        )}

        {selectedMethod === "cod" && (
          <button onClick={handleConfirm} className="btn btn-success w-full mt-4">
            Confirm COD Order
          </button>
        )}

        <button onClick={onClose} className="btn btn-outline w-full mt-2">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentPopup;
