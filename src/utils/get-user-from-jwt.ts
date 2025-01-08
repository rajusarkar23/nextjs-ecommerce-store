import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function getOTPSession() {
  const cookie = (await cookies()).get("otp-verify-session")?.value;

  if (!cookie) {
    return NextResponse.json({
      error: true,
      message: "No seesion found or session has been expired.",
    });
  }

  const decode = jwt.verify(cookie, `${process.env.USER_JWT_SECRET}`);
  //@ts-expect-error
  const userId = decode.userId;

  return userId
}
