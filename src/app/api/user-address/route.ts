import dbConnection from "@/utils/db/db";
import { checkUserSession } from "@/utils/get-user-from-jwt";
import { UserAddress } from "@/utils/models/user.address.model";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
    const { name, mobile, state, city, nearByRoadStreet, pincode } = await req.json()
    const userId = await checkUserSession()
    if (!ObjectId.isValid(userId)) {
        return NextResponse.json({ error: true, message: "Invalid user id or invalid session." })
    }
    await dbConnection()

    try {
        const create = await UserAddress.create({
            name,
            mobile,
            state,
            city,
            nearByRoadStreet,
            pincode,
            addressBelongTo: userId
        })
        if (!create) {
            console.log("unable to create");
            return NextResponse.json({ error: true, message: "Unable to add address" })
        }
        return NextResponse.json({ error: false, message: "address added" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: true, message: "Something went wrong." })

    }

}

export async function GET() {
    const userId = await checkUserSession()

    if (!ObjectId.isValid(userId)) {
        return NextResponse.json({ error: true, message: "Invalid user Id" })
    }

    await dbConnection()

    try {
        const find = await UserAddress.find({ addressBelongTo: userId })
        if (find.length === 0) {
            return NextResponse.json({ error: true, message: "No address found." })
        }
        return NextResponse.json({ error: false, find })
    } catch (error) {
        console.log(error);

    }
}