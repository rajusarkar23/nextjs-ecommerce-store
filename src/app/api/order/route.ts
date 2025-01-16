import dbConnection from "@/utils/db/db";
import { checkUserSession } from "@/utils/get-user-from-jwt";
import { Order } from "@/utils/models/order.model";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const { productId, paymentId, deliveryAddress, qty } = await req.json();

  await dbConnection()

  const userId = await checkUserSession();

  if (!ObjectId.isValid(userId)) {
    return NextResponse.json({error: true, message: "Invalid id or session"})
  }
  
  if (!userId) {
    return NextResponse.json({
      error: true,
      message: "Unable to fetch userid from session.",
    });
  }
  try {
    const createOrder = await Order.create({
      productId,
      orderedBy: userId,
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
