import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import dbConnection from "@/utils/db/db";
import { User } from "@/utils/models/user.model";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({
      error: true,
      message: "Both fields are required.",
    });
  }
  await dbConnection();
  try {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return NextResponse.json({ error: true, message: "User not found." });
    }
    if (!findUser.verified) {
      return NextResponse.json({ error: true, message: "User not verified." });
        
    }
    const decodePassword = bcrypt.compareSync(password, findUser.password);
    if (!decodePassword) {
      return NextResponse.json({ error: true, message: "Wrong password." });
    }
    const jwtToken = jwt.sign(
      { userId: findUser._id },
      `${process.env.USER_JWT_SECRET}`,
      { expiresIn: "30d" }
    );
    (await cookies()).set("session", jwtToken);
    return NextResponse.json({ error: false, message: "Signin success.", data: findUser });
  } catch (error) {
    console.log(error);
  }
}
