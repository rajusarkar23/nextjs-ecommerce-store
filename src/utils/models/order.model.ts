import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    orderedQty: {
      type: String,
      required: [true, "Order quantity is required."]
    },
    orderedBy: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
    },
    isPaymentSuccess: {
      type: Boolean,
      default: false
    },
    isOrderPlacedSuccess: {
      type: Boolean,
      default: false
    },
    isOrderDelivered: {
      type: Boolean,
      default: false
    },
    deliveryAddress: {
      type: {}
    }
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);
