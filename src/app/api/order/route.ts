import dbConnection from "@/utils/db/db";
import { Order } from "@/utils/models/order.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { productId, paymentId, deliveryAddress, qty } = await req.json();
  console.log("qty", qty);
  

  await dbConnection()

  try {
    // const findIfOrderExistWithPaymentId = await Order.findOne({ paymentId: paymentId })
    // if (findIfOrderExistWithPaymentId) {
    //   return NextResponse.json({ success: false, message: "Order already exists with this payment id." })
    // }
    const createOrder = await Order.create({
      productId,
      orderedBy: "123",
      deliveryAddress: deliveryAddress,
      orderedQty: qty
    })

    if (!createOrder) {
      return NextResponse.json({ success: false, message: "Something went wrong." })
    }
    return NextResponse.json({ success: true, message: "Order created", createOrder })
  } catch (error) {
    console.log(error);
    return NextResponse.json({error: true, message: "Something went wrong."})
  }
}

export async function PUT(req: Request){
  const {paymentId} = await req.json()
  console.log("paymentId", paymentId);
  

  await dbConnection()

  try {
    const update = await Order.findByIdAndUpdate
  } catch (error) {
    
  }
}
