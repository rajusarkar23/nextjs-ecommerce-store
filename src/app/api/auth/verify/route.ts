
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import dbConnection from "@/utils/db/db";
import { User } from "@/utils/models/user.model";
import { getOTPSession } from "@/utils/get-user-from-jwt";

export async function POST(req: Request) {
  const { otp } = await req.json();

  if (!otp) {
    return NextResponse.json({ error: true, message: "OTP undefined." });
  }

  const userId = await getOTPSession();

  if (!userId) {
    return NextResponse.json({
      error: true,
      message: "Unable to fetch userid from session.",
    });
  }
  await dbConnection();

  const findUser = await User.findById(userId);
  if (!findUser) {
    return NextResponse.json({ error: true, message: "No user found." });
  }

  const decodeOTP = bcrypt.compareSync(otp, findUser.otp);

  if (!decodeOTP) {
    return NextResponse.json({ error: true, message: "Wrong OTP." });
  }

  await User.findByIdAndUpdate(userId, { verified: true }, { new: true });

  const jwtToken = jwt.sign(
    { userId: findUser._id },
    `${process.env.USER_JWT_SECRET}`,
    { expiresIn: "30d" }
  );

  (await cookies()).set("session", jwtToken);

  return NextResponse.json({
    error: false,
    message: "OTP verified successfully.",
  });
}
