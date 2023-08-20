const mongoose = require("mongoose");

const SingleOrderItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "Please provide User"],
  },
});

const OrderSchema = new mongoose.Schema(
  {
    tax: {
      type: Number,
      required: [true, "Please provide Tax"],
    },
    shippingFee: {
      type: Number,
      required: [true, "Please provide Shipping Fee"],
    },
    subtotal: {
      type: Number,
      required: [true, "Please provide Subtotal"],
    },
    total: {
      type: Number,
      required: [true, "Please provide Total"],
    },
    orderItems: [SingleOrderItemSchema],
    status: {
      type: String,
      enum: ["pending", "failed", "paid", "delivered", "canceled"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please provide User"],
    },
    clientSecret: {
      type: String,
      required: [true, "Please provide Client Secret"],
    },

    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
