import mongoose, { Schema } from "mongoose";

const UserAddressSchema = new Schema({
  
});

export const UserAddress =
  mongoose.models.UserAddress ||
  mongoose.model("UserAddress", UserAddressSchema);
