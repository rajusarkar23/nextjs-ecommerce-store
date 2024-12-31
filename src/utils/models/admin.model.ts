// email
// passeord
// otp

import mongoose, { Schema } from "mongoose";

const AdminSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  otp: {
    type: String,
    required: [true, "Otp required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

export const Admin =
  mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
