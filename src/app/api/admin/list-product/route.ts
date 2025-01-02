import dbConnection from "@/utils/db/db";
import { Product } from "@/utils/models/product.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, content, price, discountPrice, imageUrl } = await req.json();
  await dbConnection();
  try {
    const listProduct = await Product.create({
      title,
      paragraph: content,
      price,
      discountPrice,
      image: imageUrl,
      createdBy: "123",
    });
    console.log(listProduct);
    return NextResponse.json({
      success: true,
      message: "Listed successfully.",
    });
  } catch (error) {
    console.log(error);
  }
}
