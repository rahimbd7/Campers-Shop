// src/app/modules/payment/payment.route.ts
import express from "express";
import { createPayment } from "./payment.stripe.controller";



const router = express.Router();

router.post("/create-stripe-payment", createPayment);

export const paymentRoutes = router;
