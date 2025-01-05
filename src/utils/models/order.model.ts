import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);
