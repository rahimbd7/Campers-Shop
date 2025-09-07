// src/app/modules/payment/payment.service.ts
import Stripe from "stripe";
import config from "../../../config";
 // Ensure you have STRIPE_SECRET_KEY in .env

const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: "2025-08-27.basil",
});

export const createPaymentIntent = async (amount: number, currency: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency,
      automatic_payment_methods: { enabled: true }, // For cards, wallets etc.
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    throw new Error("Failed to create payment intent");
  }
};
