import dbConnection from "@/utils/db/db";
import { checkUserSession } from "@/utils/get-user-from-jwt";
import { User } from "@/utils/models/user.model";
import { NextResponse } from "next/server";
import {ObjectId} from "mongodb"

export async function GET() {
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

  await dbConnection();

  try {
    const findUser = await User.findById(userId);
    if (!findUser) {
      return NextResponse.json({ error: true, message: "No user found." });
    } else {
      return NextResponse.json({ error: false, message: "User available." });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({error: true, message: "Something went wrong in get session, plesae try again."})
  }
}
