import { NextResponse } from "next/server";

export async function GET(req: Request){
    console.log("hitted");
    return NextResponse.json({message: "Hitted"})
}