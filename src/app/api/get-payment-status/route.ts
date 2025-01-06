import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  const { paymentId } = await req.json();

  try {
    const getPaymentDetails = await stripe.paymentIntents.retrieve(paymentId);
    
    if (getPaymentDetails.status === "succeeded") {
      return NextResponse.json({
        success: true,
        message: "Payment succeeded.",
      });
    } else {
      return NextResponse.json({ success: false, message: "Payment failed." });
    }
  } catch (error) {
    console.log(error);
  }
}
