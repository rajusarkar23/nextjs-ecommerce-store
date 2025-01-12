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
  if (!decode) {
    return NextResponse.json({
      error: true,
      message: "No seesion found or session has been expired.",
    });
  }
  //@ts-expect-error: userId exists, there will be no problem
  const userId = decode.userId;

  return userId;
}


// if the session is invalid => clear the local state
// and prompt them to login again
export async function checkUserSession() {
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) {
    return NextResponse.json({
      error: true,
      message: "No session available, Plesae signin again.",
    });
  }

  const decode = jwt.verify(cookie, `${process.env.USER_JWT_SECRET}`);
  //@ts-expect-error: userId exists, there will be no problem
  const userId = decode.userId;
  return userId;
}
