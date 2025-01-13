import mongoose, { Schema } from "mongoose";

const UserAddressSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  mobile: {
    type: Number,
    required: [true, "Number is required"]
  },
  state: {
    type: String,
    required: [true, "State is required"]
  },
  city: {
    type: String,
    required: [true, "City is required"]
  },
  nearByRoadStreet: {
    type: String,
    required: [true, "nearByRoadStreet is required"]
  },
  pincode: {
    type: Number,
    required: [true, "Pincode is required"]
  },
  addressCreatedBy: {
    type: String,
    required: [true, "addressCreatedBy undefined"]
  }
}, { timestamps: true });

export const UserAddress =
  mongoose.models.UserAddress ||
  mongoose.model("UserAddress", UserAddressSchema);
