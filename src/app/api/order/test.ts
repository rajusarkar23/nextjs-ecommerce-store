import { NextResponse } from "next/server";

export async function POST(req: Request){
    console.log("ran");
    
    const {_id, name, state} = await req.json()
    console.log(name);
    return NextResponse.json({message: "received"})
}