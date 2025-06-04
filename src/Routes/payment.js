const express = require("express");
const { userAuth } = require("../Middleware/auth");
const razorpayInstance = require("../utils/razorpay");
const paymentRouter = express.Router();
const Payment = require("../Models/payment");
const User = require("../Models/user");
const { MEMBERSHIP_AMOUNT } = require("../utils/constants");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName } = req.user;
    const order = await razorpayInstance.orders.create({
      amount: MEMBERSHIP_AMOUNT[membershipType] * 100, // Convert to paise
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        membershipType,
      },
    });

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
      notes: order.notes,
    });
    const savedPayment = await payment.save();
    res.json({ ...savedPayment.toJSON(), key_Id: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.headers("x-razorpay-signature");
    const paymentDetails = req.body.payload.payment.entity;
    const {
      validateWebhookSignature,
    } = require("razorpay/dist/utils/razorpay-utils");

    validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    const payment = await Payment.findOne({
      orderId: paymentDetails.order_id,
    });
    payment.status = paymentDetails.status;
    await payment.save();

    const user = await User.findById(payment.userId);
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save();

    return res.status(200).json({ message: "Webhook received successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = paymentRouter;
