import dbConnection from "@/utils/db/db";
import { Order } from "@/utils/models/order.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { productId, paymentId } = await req.json();

  await dbConnection()

  try {
    const findIfOrderExistWithPaymentId = await Order.findOne({paymentId: paymentId})
    if (findIfOrderExistWithPaymentId) {
        return NextResponse.json({success: false, message: "Order already exists with this payment id."})
    }
    const createOrder = await Order.create({
        productId,
        paymentId,
        buyerId: "123456"
    })

    if (!createOrder) {
        return NextResponse.json({success: false, message: "Something went wrong."})
    }
    return NextResponse.json({success: true, message: "Order created"})
  } catch (error) {
    console.log(error);
    
  }
}
