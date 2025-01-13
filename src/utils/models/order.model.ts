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
    orderedBy: {
      type: String,
      required: true,
    },
    isPaymentSuccess: {
      type: Boolean,
      default: false
    },
    isOrderDelivered: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);
