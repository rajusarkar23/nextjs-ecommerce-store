import dbConnection from "@/utils/db/db";
import { Product } from "@/utils/models/product.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  await dbConnection();

  try {
    const find = await Product.findById(id);

    if (find) {
      return NextResponse.json({ success: true, find });
    }

    return NextResponse.json({ success: false });
  } catch (error) {
    console.log(error);
  }
}
