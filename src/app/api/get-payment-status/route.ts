import { NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { paymentId } = await req.json();
  console.log(paymentId);
  

  try {
    const getPaymentDetails = await stripe.paymentIntents.retrieve(paymentId);
    
    if (getPaymentDetails.status === "succeeded") {
      console.log("ok");
      
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
