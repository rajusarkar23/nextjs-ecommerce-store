import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";
import dbConnection from "@/utils/db/db";
import { User } from "@/utils/models/user.model";
import { generateOTP } from "@/utils";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log(email);

  if (!email || !password) {
    return NextResponse.json({
      error: true,
      message: "Either email nor password is undefined.",
    });
  }

  const sender = process.env.EMAIL;
  const mailPassword = process.env.EMAIL_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: sender,
      pass: mailPassword,
    },
  });

  try {
    await dbConnection();
    const find = await User.findOne({ email: email });

    if (find) {
      return NextResponse.json({ error: true, message: "User already exists with this email." });
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const otp = generateOTP(6)
    const hashOTP = bcrypt.hashSync(otp, 10)
    const create = await User.create({
      email,
      password: hashPassword,
      otp: hashOTP
    });

    if (!create) {
      return NextResponse.json({
        error: true,
        message: "Unable to register, try again.",
      });
    }

    const jwtToken = jwt.sign(
      { userId: create._id },
      `${process.env.USER_JWT_SECRET}`
    );

    (await cookies()).set("otp-verify-session", jwtToken);

    //send mail
    await transporter.sendMail({
      from: sender,
      to: email,
      replyTo: sender,
      subject: `Verification OTP`,
      html: `
       <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 0; margin: 0; width: 100%; height: 100%;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%; height: 100%; background-color: #f4f4f4; text-align: center;">
        <tr>
          <td style="padding: 40px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); text-align: center;">
              <tr>
                <td>
                  <h2 style="color: #333333; margin-bottom: 20px;">Here is your OTP</h2>
                  <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">Welcome onboard, Please verify your email with the below OTP.</p>
                  <p style="font-size: 18px; color: #333333; margin-bottom: 30px;"><strong>OTP: ${otp}</strong></p>
                  <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">From: ${sender}</p>
                  <p style="font-size: 14px; color: #777777;">This is an automated message, please do not reply.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>`,
    });

    return NextResponse.json({ error: false, message: "User created" });
  } catch (error) {
    console.log(error);
  }
}