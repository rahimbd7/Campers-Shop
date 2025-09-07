import { Request, Response, NextFunction } from "express";
import { createPaymentIntent } from "./payment.stripe.service";

export const createPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      res.status(400).json({ success: false, message: "Amount and currency are required" });
      return;
    }

    const paymentIntent = await createPaymentIntent(amount, currency);

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.clientSecret,
    });
  } catch (error) {
    next(error); 
  }
};
