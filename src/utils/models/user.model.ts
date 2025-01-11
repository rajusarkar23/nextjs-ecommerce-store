import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: [true, "OTP undefined"]
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
